﻿'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { courseService } from '@/lib/services/courseService';
import { bookingService } from '@/lib/services/bookingService';
import { Course } from '@/types/course';

function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const [step, setStep] = useState(1);
  const [course, setCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    courseId: courseId || '',
    studentName: '',
    phone: '',
    email: '',
    preferredDate: '',
    timeSlot: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (courseId) {
      courseService.getCourseById(courseId).then(setCourse);
    }
  }, [courseId]);

  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00',
    '19:00-20:00', '20:00-21:00'
  ];

  const steps = [
    { number: 1, title: '选择课程', icon: CheckCircle },
    { number: 2, title: '选择时间', icon: Calendar },
    { number: 3, title: '填写信息', icon: User },
    { number: 4, title: '确认提交', icon: CheckCircle },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const booking = await bookingService.createBooking(formData);

    setIsSubmitting(false);
    alert('预约成功！我们会尽快与您联系。');
    router.push('/profile');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">在线预约</h1>
          <p className="text-gray-600 text-lg">简单三步，开始您的音乐学习之旅</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = step === s.number;
              const isCompleted = step > s.number;

              return (
                <div key={s.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-indigo-600 text-white scale-110'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : s.number}
                    </div>
                    <span className={`mt-2 text-sm font-medium ${isActive ? 'text-indigo-600' : 'text-gray-500'}`}>
                      {s.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded ${step > s.number ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">选择课程</h2>
              {course ? (
                <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-indigo-600/20">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4">{course.description.slice(0, 100)}...</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>⏱️ {course.duration}课时</span>
                        <span>📊 {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}</span>
                        <span className="text-2xl font-bold text-indigo-600">¥{course.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">请先选择一门课程</p>
                  <button
                    onClick={() => router.push('/courses')}
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-purple-600 transition-colors"
                  >
                    浏览课程
                  </button>
                </div>
              )}
              {course && (
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-all"
                  >
                    下一步
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">选择上课时间</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">选择日期</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData('preferredDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">选择时间段</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => updateFormData('timeSlot', slot)}
                      className={`px-4 py-3 rounded-lg border-2 font-medium transition-all ${
                        formData.timeSlot === slot
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-gray-200 hover:border-indigo-600 hover:bg-indigo-700/5'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.preferredDate || !formData.timeSlot}
                  className="px-8 py-3 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">填写个人信息</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名 *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => updateFormData('studentName', e.target.value)}
                      placeholder="请输入您的姓名"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">手机号 *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="请输入手机号"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="请输入邮箱地址"
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">备注信息</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.message}
                      onChange={(e) => updateFormData('message', e.target.value)}
                      placeholder="有任何特殊需求或问题请告诉我们"
                      rows={4}
                      className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!formData.studentName || !formData.phone}
                  className="px-8 py-3 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  下一步
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">确认预约信息</h2>
              <div className="space-y-4 mb-8 p-6 rounded-xl bg-gray-50">
                {course && (
                  <div className="pb-4 border-b">
                    <h3 className="font-semibold text-gray-600 mb-2">课程信息</h3>
                    <p className="text-lg font-bold">{course.title}</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-2">¥{course.price}</p>
                  </div>
                )}
                <div className="pb-4 border-b">
                  <h3 className="font-semibold text-gray-600 mb-2">上课时间</h3>
                  <p className="text-lg">{formData.preferredDate} {formData.timeSlot}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600 mb-2">联系信息</h3>
                  <p>姓名: {formData.studentName}</p>
                  <p>手机: {formData.phone}</p>
                  {formData.email && <p>邮箱: {formData.email}</p>}
                  {formData.message && <p className="mt-2 text-gray-600">备注: {formData.message}</p>}
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 rounded-lg border-2 border-gray-300 font-semibold hover:bg-gray-50 transition-colors"
                >
                  上一步
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-lg gradient-primary text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '提交中...' : '确认预约'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <BookingPage />
    </Suspense>
  );
}

