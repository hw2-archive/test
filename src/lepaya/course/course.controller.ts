import { Controller, Get, Header, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AuditLog } from 'src/app/events.decorator';
import { CourseTypeHydrated, CourseTypePartial } from './course.dto';
import { CourseService } from './course.service';

@Controller('/api/lepaya-courses/')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * Get a course from the lepaya API and resolve the nested fields
   *
   * @param id - id of the course
   * @returns selected course
   */
  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiResponse({ type: CourseTypeHydrated })
  @AuditLog()
  getCourse(
    @Param('id') id: string,
  ): Observable<AxiosResponse<CourseTypeHydrated>> {
    return this.courseService.getCourse(id);
  }

  /**
   * Get the list of all the courses without the resolved fields
   *
   * @returns list of courses
   */
  @Get()
  @Header('content-type', 'application/json')
  @ApiResponse({ type: Array<CourseTypePartial> })
  @AuditLog()
  getCourses(): Observable<AxiosResponse<CourseTypePartial[]>> {
    return this.courseService.getCourses();
  }
}
