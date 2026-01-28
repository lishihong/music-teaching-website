import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Clock, Users, Award, CheckCircle, ArrowLeft } from 'lucide-react';
import { courseService } from '@/lib/services/courseService';
import { teacherService } from '@/lib/services/teacherService';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  const courses = await courseService.getAllCourses();
  return courses.map((course) => ({
    id: course.id,
  }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await courseService.getCourseById(id);

  if (!course) {
    notFound();
  }

  const teacher = await teacherService.getTeacherById(course.teacherId);

  const tabs = [
    { id: 'intro', label: '课程介绍' },
    { id: 'syllabus', label: '课程大纲' },
    { id: 'teacher', label: '教师介绍' },
    { id: 'reviews', label: '学员评价' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/courses"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回课程列表
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-video bg-gray-900">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all flex items-center justify-center group">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1 group-hover:scale-110 transition-transform"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                  {course.instrument === 'piano' && '🎹 钢琴'}
                  {course.instrument === 'guitar' && '🎸 吉他'}
                  {course.instrument === 'violin' && '🎻 小提琴'}
                  {course.instrument === 'drum' && '🥁 架子鼓'}
                </span>
                <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold">
                  {course.level === 'beginner' && '初级'}
                  {course.level === 'intermediate' && '中级'}
                  {course.level === 'advanced' && '高级'}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-gray-500">({course.studentsCount} 学员)</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration} 课时</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span>{course.studentsCount} 人学习</span>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-2xl font-bold mb-4">课程介绍</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {course.description}
                </p>

                <h3 className="text-xl font-bold mb-4">你将获得</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-bold mb-4">课程大纲</h3>
                <div className="space-y-3">
                  {course.syllabus.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-semibold">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 pt-1">{item}</p>
                    </div>
                  ))}
                </div>

                {teacher && (
                  <>
                    <h3 className="text-xl font-bold mb-4 mt-8">授课教师</h3>
                    <div className="flex items-start space-x-4 p-6 rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={teacher.avatar}
                          alt={teacher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-1">{teacher.name}</h4>
                        <p className="text-primary font-semibold mb-2">{teacher.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            <span>{teacher.rating} 评分</span>
                          </div>
                          <span>{teacher.experience}年教学经验</span>
                          <span>{teacher.studentsCount}名学员</span>
                        </div>
                        <p className="text-gray-700 line-clamp-3">{teacher.bio}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-4">
                ¥{course.price}
              </div>

              <Link
                href={`/booking?courseId=${course.id}`}
                className="w-full py-4 rounded-lg gradient-primary text-white font-bold text-center hover:shadow-xl transition-all flex items-center justify-center mb-3"
              >
                立即预约
              </Link>

              <button className="w-full py-4 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">
                收藏课程
              </button>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">课程时长</span>
                  <span className="font-semibold">{course.duration} 课时</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">难度级别</span>
                  <span className="font-semibold">
                    {course.level === 'beginner' && '初级'}
                    {course.level === 'intermediate' && '中级'}
                    {course.level === 'advanced' && '高级'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">学习人数</span>
                  <span className="font-semibold">{course.studentsCount} 人</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">课程评分</span>
                  <span className="font-semibold flex items-center">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    {course.rating}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-bold mb-3">课程特色</h4>
                <div className="space-y-2">
                  {course.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
