import type { TrainerType } from 'src/lepaya/trainer/trainer.dto';
import type { LearnerType } from 'src/lepaya/learner/learner.dto';
import { OmitType } from '@nestjs/swagger';

export class CourseTypePartial {
  id: string;
  title: string;
  date: Date;
  trainerId: string;
  learners: string[];
}

export class CourseTypeHydrated extends OmitType(CourseTypePartial, [
  'trainerId',
  'learners',
]) {
  trainer: TrainerType;
  learners: LearnerType[];
}
