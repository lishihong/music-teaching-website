'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, BookOpen, Calendar, Heart, Award, Clock, Star, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');

  const mockUser = {
    id: 'user-1',
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    phone: '138****8888',
    membershipLevel: 'premium' as const,
    joinedDate: '2025-01-15',
    learningStats: {
      coursesCompleted: 3,
      totalHours: 48,
      certificates: 2,
    }
  };

  const mockCourses = [
    {
      id: 'course-1',
      title: '零基础钢琴入门课程',
      progress: 75,
      lastAccessed: '2026-01-26',
      thumbnail: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&h=300&fit=crop'
    },
    {
      id: 'course-3',
      title: '民谣吉他速成班',
      progress: 45,
      lastAccessed: '2026-01-25',
      thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop'
    },
  ];

  const mockBookings = [
    {
      id: 'booking-1',
      courseTitle: '古典钢琴进阶技巧',
      date: '2026-02-01',
      time: '14:00-15:00',
      status: 'confirmed' as const
    },
    {
      id: 'booking-2',
      courseTitle: '小提琴基础教程',
      date: '2026-02-05',
      time: '10:00-11:00',
      status: 'pending' as const
    },
  ];

  const tabs = [
    { id: 'overview', label: '概览', icon: User },
    { id: 'courses', label: '我的课程', icon: BookOpen },
    { id: 'bookings', label: '预约记录', icon: Calendar },
    { id: 'favorites', label: '收藏', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary via-secondary to-pink-500 rounded-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
              <Image
                src={mockUser.avatar}
                alt={mockUser.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{mockUser.name}</h1>
              <p className="text-white/90 mb-3">{mockUser.email}</p>
              <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm font-semibold">
                {mockUser.membershipLevel === 'premium' ? '💎 高级会员' : '⭐ 普通会员'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">{mockUser.learningStats.coursesCompleted}</div>
                <div className="text-white/80 text-sm">已完成课程</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{mockUser.learningStats.totalHours}</div>
                <div className="text-white/80 text-sm">学习时长(h)</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{mockUser.learningStats.certificates}</div>
                <div className="text-white/80 text-sm">获得证书</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-600">学习进度</h3>
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">68%</div>
                    <p className="text-sm text-gray-600">本周学习2小时</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-600">课程数量</h3>
                      <BookOpen className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{mockCourses.length}</div>
                    <p className="text-sm text-gray-600">正在学习中</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-600">待预约</h3>
                      <Calendar className="w-6 h-6 text-purple-500" />
                    </div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">{mockBookings.length}</div>
                    <p className="text-sm text-gray-600">即将上课</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-4">最近学习</h2>
                  <div className="space-y-4">
                    {mockCourses.map((course) => (
                      <div key={course.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{course.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>进度: {course.progress}%</span>
                            <span>最后学习: {course.lastAccessed}</span>
                          </div>
                          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <Link
                          href={`/courses/${course.id}`}
                          className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-purple-600 transition-colors"
                        >
                          继续学习
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">我的课程</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                      <div className="relative h-40">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2">{course.title}</h3>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>学习进度</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            最后学习: {course.lastAccessed}
                          </span>
                          <Link
                            href={`/courses/${course.id}`}
                            className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-purple-600 transition-colors"
                          >
                            继续学习
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">预约记录</h2>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="p-6 rounded-xl border-2 hover:border-indigo-600 transition-all">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold">{booking.courseTitle}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.status === 'confirmed' ? '已确认' : '待确认'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5" />
                          <span>{booking.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-bold mb-6">我的收藏</h2>
                <div className="text-center py-12 text-gray-500">
                  <Heart className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>暂无收藏课程</p>
                  <Link href="/courses" className="mt-4 inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-purple-600 transition-colors">
                    去浏览课程
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

