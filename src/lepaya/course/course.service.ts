import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import * as RX from 'rxjs';
import * as axFn from 'src/libs/axios.functions';
import { TrainerType } from 'src/lepaya/trainer/trainer.dto';
import { TrainerService } from 'src/lepaya/trainer/trainer.service';
import { CourseTypePartial, CourseTypeHydrated } from './course.dto';
import { curry } from 'rambda';
import { LearnerService } from 'src/lepaya/learner/learner.service';
import { LearnerType } from 'src/lepaya/learner/learner.dto';
import { arrayToPipe } from 'src/libs/rxjs.functions';
import { AppConfigService } from 'src/app/config.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly httpService: HttpService,
    private readonly trainerService: TrainerService,
    private readonly learnerService: LearnerService,
    private configService: AppConfigService,
  ) {}

  /**
   * Impure functions
   */

  /**
   * Get a course from the lepaya API and resolve the nested fields
   * @param id - id of the course
   * @returns
   */
  getCourse(id: string): RX.Observable<AxiosResponse<CourseTypeHydrated>> {
    return this.httpService
      .get(`${this.configService.apiBaseUrl}/courses/${id}`)
      .pipe(axFn.getFirstData(), RX.mergeMap(this.resolveFields));
  }

  /**
   *
   * @returns the list of all the available courses without the resolved fields
   */
  getCourses(): RX.Observable<AxiosResponse<CourseTypePartial[]>> {
    return this.httpService
      .get(`${this.configService.apiBaseUrl}/courses`)
      .pipe(axFn.getData());
  }

  /**
   * It retrieves the information of all the learners
   *
   * @param learners - Array of learners ID
   * @returns An observable object of axios responses
   */
  private resolveLearners = (
    learners: string[],
  ): RX.Observable<AxiosResponse<LearnerType>[]> => {
    return RX.forkJoin(learners.map(this.learnerService.getLearner));
  };

  /**
   * Resolve the nested fields of the retrieved course
   *
   * @param course - course retrieved by the lepaya API
   * @returns hydrated course with resolved fields
   */
  private resolveFields = (
    course: CourseTypePartial,
  ): RX.Observable<AxiosResponse<CourseTypeHydrated>> => {
    const trainer = this.trainerService.getTrainer(course.trainerId);
    const learners = this.resolveLearners(course.learners);

    return RX.forkJoin([trainer, learners]).pipe(
      arrayToPipe(this.hydrateCourse(course)),
    );
  };

  /**
   * Pure functions
   */

  /**
   * Curried function to hydrate the course with the trainer and the learners
   */
  private hydrateCourse = curry(
    (
      course: CourseTypePartial,
      trainer: TrainerType,
      learners: LearnerType[],
    ): CourseTypeHydrated => {
      return {
        ...course,
        trainer,
        learners,
      };
    },
  );
}
