﻿﻿﻿import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Users, Award, Clock } from 'lucide-react';
import { courseService } from '@/lib/services/courseService';
import { teacherService } from '@/lib/services/teacherService';
import instrumentsData from '@/data/instruments.json';

export const dynamic = 'force-static';

export default async function HomePage() {
  const featuredCourses = await courseService.getFeaturedCourses(6);
  const featuredTeachers = await teacherService.getFeaturedTeachers(4);

  return (
    <div className="w-full">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-fade-in">
            开启你的音乐之旅
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            汇聚顶尖音乐教师，提供专业系统的在线课程<br />
            让音乐梦想触手可及
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/courses"
              className="px-8 py-4 rounded-full gradient-primary text-white font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>浏览课程</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/booking"
              className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
            >
              免费试课
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">500+</div>
              <div className="text-gray-600">精品课程</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">专业教师</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-500 mb-2">10万+</div>
              <div className="text-gray-600">学员</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-500 mb-2">4.9</div>
              <div className="text-gray-600">课程评分</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">选择你的乐器</h2>
            <p className="text-gray-600 text-lg">从零开始，专业指导，成就音乐梦想</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instrumentsData.map((instrument) => (
              <Link
                key={instrument.id}
                href={`/courses?instrument=${instrument.id}`}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {instrument.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: instrument.color }}>
                  {instrument.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{instrument.description}</p>
                <div className="flex items-center text-indigo-600 font-semibold">
                  <span>查看课程</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">精选课程推荐</h2>
            <p className="text-gray-600 text-lg">专业系统的课程体系，助你快速进步</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-semibold">
                    {course.instrument === 'piano' && '🎹 钢琴'}
                    {course.instrument === 'guitar' && '🎸 吉他'}
                    {course.instrument === 'violin' && '🎻 小提琴'}
                    {course.instrument === 'drum' && '🥁 架子鼓'}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{course.rating}</span>
                      <span className="text-gray-500 text-sm">({course.studentsCount}人)</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}课时</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-indigo-600">
                      ¥{course.price}
                    </div>
                    <div className="px-4 py-2 rounded-full bg-indigo-600/10 text-indigo-600 text-sm font-semibold">
                      {course.level === 'beginner' && '初级'}
                      {course.level === 'intermediate' && '中级'}
                      {course.level === 'advanced' && '高级'}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="inline-flex items-center px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-purple-600 transition-colors"
            >
              查看全部课程
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">明星教师团队</h2>
            <p className="text-gray-600 text-lg">专业资深的音乐教育专家，倾囊相授</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTeachers.map((teacher) => (
              <div
                key={teacher.id}
                className="group text-center"
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                <p className="text-indigo-600 font-semibold mb-2">{teacher.title}</p>
                <p className="text-gray-600 text-sm">{teacher.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">为什么选择我们</h2>
            <p className="text-gray-600 text-lg">专业、系统、高效的音乐学习体验</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">顶尖师资</h3>
              <p className="text-gray-600 text-center">
                汇聚音乐学院教授、知名演奏家，平均教龄10年以上，为您提供最专业的指导
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-6 mx-auto">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">系统课程</h3>
              <p className="text-gray-600 text-center">
                科学的课程体系，从入门到精通，循序渐进，让每个学员都能稳步提升
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-6 mx-auto">
                <Clock className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">灵活学习</h3>
              <p className="text-gray-600 text-center">
                在线视频课程，随时随地学习，自由安排学习时间，工作学习两不误
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

