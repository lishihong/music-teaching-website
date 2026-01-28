'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Star, Clock } from 'lucide-react';

// Mock data - 在实际项目中从 API 获取
const coursesData = [
  {
    id: 'course-1',
    title: '零基础钢琴入门课程',
    instrument: 'piano',
    level: 'beginner',
    price: 2999,
    duration: 24,
    rating: 4.8,
    studentsCount: 1520,
    thumbnail: 'https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=600&fit=crop',
    description: '从零开始学习钢琴，掌握基本指法和乐理知识，轻松弹奏简单曲目'
  },
  {
    id: 'course-2',
    title: '流行吉他弹唱速成',
    instrument: 'guitar',
    level: 'beginner',
    price: 2499,
    duration: 20,
    rating: 4.9,
    studentsCount: 2340,
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&h=600&fit=crop',
    description: '快速掌握吉他弹唱技巧，学会热门流行歌曲伴奏'
  },
  {
    id: 'course-3',
    title: '小提琴古典演奏技巧',
    instrument: 'violin',
    level: 'intermediate',
    price: 3999,
    duration: 32,
    rating: 4.7,
    studentsCount: 856,
    thumbnail: 'https://images.unsplash.com/photo-1452928210811-13fa8611fa13?w=800&h=600&fit=crop',
    description: '提升小提琴演奏技巧，学习古典名曲的演奏方法'
  },
  {
    id: 'course-4',
    title: '架子鼓节奏训练营',
    instrument: 'drum',
    level: 'beginner',
    price: 2799,
    duration: 28,
    rating: 4.8,
    studentsCount: 1120,
    thumbnail: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&h=600&fit=crop',
    description: '从基础节奏开始，掌握架子鼓演奏的核心技巧'
  },
  {
    id: 'course-5',
    title: '钢琴进阶演奏课程',
    instrument: 'piano',
    level: 'intermediate',
    price: 3499,
    duration: 30,
    rating: 4.9,
    studentsCount: 980,
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    description: '提升钢琴演奏水平，学习复杂曲目和高级技巧'
  },
  {
    id: 'course-6',
    title: '吉他指弹进阶教程',
    instrument: 'guitar',
    level: 'advanced',
    price: 3999,
    duration: 36,
    rating: 4.8,
    studentsCount: 645,
    thumbnail: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&h=600&fit=crop',
    description: '掌握高级指弹技巧，演奏复杂的独奏曲目'
  }
];

const instruments = [
  { id: 'all', name: '全部', icon: '🎵' },
  { id: 'piano', name: '钢琴', icon: '🎹' },
  { id: 'guitar', name: '吉他', icon: '🎸' },
  { id: 'violin', name: '小提琴', icon: '🎻' },
  { id: 'drum', name: '架子鼓', icon: '🥁' }
];

const levels = [
  { id: 'all', name: '全部难度' },
  { id: 'beginner', name: '初级' },
  { id: 'intermediate', name: '中级' },
  { id: 'advanced', name: '高级' }
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesInstrument = selectedInstrument === 'all' || course.instrument === selectedInstrument;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      return matchesSearch && matchesInstrument && matchesLevel;
    });
  }, [searchQuery, selectedInstrument, selectedLevel]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">探索音乐课程</h1>
          <p className="text-gray-600 text-lg">找到适合你的课程，开启音乐学习之旅</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="搜索课程名称或关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-colors text-lg"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">乐器类型:</span>
              <div className="flex gap-2">
                {instruments.map(instrument => (
                  <button
                    key={instrument.id}
                    onClick={() => setSelectedInstrument(instrument.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedInstrument === instrument.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {instrument.icon} {instrument.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">难度:</span>
              <div className="flex gap-2">
                {levels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      selectedLevel === level.id
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {level.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 text-center">
          <p className="text-gray-600">
            找到 <span className="font-semibold text-indigo-600">{filteredCourses.length}</span> 门课程
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
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
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-indigo-600/90 backdrop-blur-sm text-white text-sm font-semibold">
                  {course.instrument === 'piano' && '🎹 钢琴'}
                  {course.instrument === 'guitar' && '🎸 吉他'}
                  {course.instrument === 'violin' && '🎻 小提琴'}
                  {course.instrument === 'drum' && '🥁 架子鼓'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
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
                  <div className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
                    {course.level === 'beginner' && '初级'}
                    {course.level === 'intermediate' && '中级'}
                    {course.level === 'advanced' && '高级'}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg mb-4">没有找到符合条件的课程</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedInstrument('all');
                setSelectedLevel('all');
              }}
              className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-purple-600 transition-colors"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

