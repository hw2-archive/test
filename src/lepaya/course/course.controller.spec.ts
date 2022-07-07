import { Test, TestingModule } from '@nestjs/testing';
import { AppModuleOptions } from 'src/app/app.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

const results = {
  defined: true,
};

describe('CourseController', () => {
  let courseController: CourseController;
  let courseService: CourseService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule(
      AppModuleOptions,
    ).compile();

    courseService = app.get<CourseService>(CourseService);
    courseController = app.get<CourseController>(CourseController);

    jest.resetAllMocks();
  });

  describe('root', () => {
    it('should return the mocked results', () => {
      const spiedGetCourses = jest
        .spyOn(courseService, 'getCourses')
        .mockImplementation(() => results as any);

      expect(courseController.getCourses()).toBe(results);
      expect(spiedGetCourses).toBeCalledTimes(1);
    });
  });
});
