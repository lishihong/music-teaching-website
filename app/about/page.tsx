﻿﻿﻿import Image from 'next/image';
import { Music, Target, Heart, Award, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { teacherService } from '@/lib/services/teacherService';

export const dynamic = 'force-static';

export default async function AboutPage() {
  const teachers = await teacherService.getAllTeachers();

  return (
    <div className="w-full">
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">关于乐享音乐</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            专业的在线音乐教育平台，让每个人都能享受音乐的乐趣
          </p>
          <div className="flex items-center justify-center space-x-4 text-lg">
            <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              📅 成立于 2020年
            </div>
            <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              🎓 10万+ 学员
            </div>
            <div className="px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm">
              ⭐ 4.9/5.0 评分
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">我们的故事</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              乐享音乐成立于2020年，由一群热爱音乐的教育工作者创办。我们相信，音乐教育不应该被地域和时间限制，每个人都应该有机会接受专业的音乐指导。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop"
                alt="音乐教室"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">专注音乐教育</h3>
              <p className="text-gray-700 leading-relaxed">
                经过多年的发展，乐享音乐已经成长为国内领先的在线音乐教育平台。我们汇聚了来自全国各大音乐学院的优秀教师，提供钢琴、吉他、小提琴、架子鼓等多种乐器的专业课程。
              </p>
              <p className="text-gray-700 leading-relaxed">
                我们的课程体系经过精心设计，从零基础入门到专业级提升，满足不同学员的需求。通过在线视频教学配合实时答疑，让学员在家就能享受到音乐学院级别的教学质量。
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="text-3xl font-bold text-indigo-600 mb-1">500+</div>
                  <div className="text-sm text-gray-600">精品课程</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-secondary/10 to-pink-500/10">
                  <div className="text-3xl font-bold text-purple-600 mb-1">50+</div>
                  <div className="text-sm text-gray-600">专业教师</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">我们的价值观</h2>
            <p className="text-gray-600 text-lg">用心做教育，让音乐改变生活</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Music className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">专业至上</h3>
              <p className="text-gray-600">
                精选顶尖音乐学院毕业的教师，确保教学质量和专业水准
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">因材施教</h3>
              <p className="text-gray-600">
                根据学员不同基础和需求，提供个性化的学习方案
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">用心服务</h3>
              <p className="text-gray-600">
                全程贴心服务，及时解答疑问，陪伴学员成长每一步
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3">追求卓越</h3>
              <p className="text-gray-600">
                不断优化课程体系，持续提升教学效果和用户体验
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">师资团队</h2>
            <p className="text-gray-600 text-lg">专业、敬业、富有激情的教育团队</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.slice(0, 6).map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="relative h-64">
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-3">{teacher.title}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{teacher.bio}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>⏱️ {teacher.experience}年经验</span>
                    <span>👥 {teacher.studentsCount}名学员</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">联系我们</h2>
              <p className="text-white/80 mb-8 text-lg">
                有任何问题或建议？欢迎随时联系我们，我们将竭诚为您服务。
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">客服热线</h4>
                    <p className="text-white/80">400-888-8888</p>
                    <p className="text-white/60 text-sm">周一至周日 9:00-21:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">电子邮箱</h4>
                    <p className="text-white/80">contact@musiclearning.com</p>
                    <p className="text-white/60 text-sm">我们会在24小时内回复</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">公司地址</h4>
                    <p className="text-white/80">北京市朝阳区音乐大厦10楼</p>
                    <p className="text-white/60 text-sm">地铁10号线，音乐广场站A出口</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">营业时间</h4>
                    <p className="text-white/80">周一至周日 9:00-21:00</p>
                    <p className="text-white/60 text-sm">节假日正常营业</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">在线留言</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">姓名</label>
                  <input
                    type="text"
                    placeholder="请输入您的姓名"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱</label>
                  <input
                    type="email"
                    placeholder="请输入您的邮箱"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">留言内容</label>
                  <textarea
                    rows={4}
                    placeholder="请输入您的留言"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/50 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                  发送留言
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

