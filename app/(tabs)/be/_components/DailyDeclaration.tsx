import { View, Text, Pressable, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { BlurView } from 'expo-blur';
import { Image } from 'expo-image';
import timeLogo from '~/assets/images/be/time.png';
cssInterop(LinearGradient, { className: 'style' });
cssInterop(Image, { className: 'style' });
cssInterop(BlurView, { className: 'style' });
cssInterop(Text, { className: 'style' });
type DeclarationCardProps = {
  title: string;
  time: string;
  status: 'completed' | 'pending';
  content?: string;
  onSubmit?: (content: string) => void;
  inputValue?: string;
  onInputChange?: (value: string) => void;
};
type EveningReportItem = {
  label: string;
  value: string;
};

const DeclarationCard = ({
  title,
  time,
  status,
  content,
  onSubmit,
  inputValue,
  onInputChange,
}: DeclarationCardProps) => <View className="mb-4 overflow-hidden rounded-xl bg-white"></View>;

type TimeSlot = {
  content: string;
  time: string;
};

const getBarColor = (title: string) => {
  switch (title) {
    case '上午':
      return '#7AE1C3';
    case '中午':
      return '#FBA720';
    case '下午':
      return '#1587FD';
    case '晚上':
      return '#440063';
    default:
      return '#1483FD';
  }
};

export default function DailyDeclaration() {
  const [timeSlots, setTimeSlots] = useState<TimeSlotSection[]>([
    {
      title: '上午',
      items: [
        { content: '完成项目文档初稿', time: '7:00' },
        { content: '与团队进行晨会讨论', time: '8:00' },
        { content: '优化用户界面设计', time: '9:00' },
      ],
    },
    {
      title: '中午',
      items: [
        { content: '整理上午工作进度', time: '12:00' },
        { content: '准备下午会议材料', time: '13:00' },
      ],
    },
    {
      title: '下午',
      items: [
        { content: '进行项目评审会议', time: '14:00' },
        { content: '处理用户反馈问题', time: '15:00' },
      ],
    },
    {
      title: '晚上',
      items: [
        { content: '总结今日工作完成情况', time: '19:00' },
        { content: '规划明日工作重点', time: '20:00' },
      ],
    },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eveningContent, setEveningContent] = useState('');
  const [eveningStatus, setEveningStatus] = useState<'completed' | 'pending'>('pending');
  const [remainingTime, setRemainingTime] = useState('');
  const [eveningReport, setEveningReport] = useState<EveningReportItem[]>([
    { label: '打分', value: '' },
    { label: '体验', value: '' },
    { label: '行得通', value: '' },
    { label: '行不通', value: '' },
    { label: '学习到', value: '' },
    { label: '下一步', value: '' },
  ]);

  const [dailyResult, setDailyResult] = useState({
    totalGoal: '',
    weeklyProgress: '10/8',
    monthlyProgress: '10/8',
  });
  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date();
      const deadline = new Date(now);
      deadline.setHours(21, 0, 0);

      if (now > deadline) {
        setRemainingTime('今日晚宣告已截止');
        return;
      }

      const diff = deadline.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setRemainingTime(`距离晚宣告截止还有 ${hours} 小时 ${minutes} 分钟`);
    };

    updateRemainingTime();
    const timer = setInterval(updateRemainingTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (!eveningContent.trim()) {
      // 可以添加提示信息
      return;
    }
    setEveningStatus('completed');
  };

  const weekday = ['日', '一', '二', '三', '四', '五', '六'][currentDate.getDay()];
  const week = Math.ceil((currentDate.getDate() - currentDate.getDay()) / 7);

  return (
    <ScrollView
      className="flex-1  pt-2"
      contentContainerStyle={{
        paddingBottom: 160, // 40 * 4，确保底部内容不被导航栏遮挡
      }}
      showsVerticalScrollIndicator={false}>
      <View className="mb-2 mt-2 flex-row items-center justify-center">
        <Ionicons name="warning" size={16} color="#ef4444" />
        <Text className="ml-2 text-sm text-red-500">{remainingTime}</Text>
      </View>
      {/* 日期头部 */}
      <View className="items-center py-4">
        <View className="flex-row items-center justify-center">
          <Text className="text-lg font-semibold">{`${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${currentDate.getDate()}日`}</Text>
        </View>
        <View className="mt-1 flex-row items-center justify-center">
          <Text className="text-base text-gray-500">{`第`}</Text>
          <Text className="text-base text-[#1483FD]">{week}</Text>
          <Text className="text-base text-gray-500">{`天 第`}</Text>
          <Text className="text-base text-[#1483FD]">{week}</Text>
          <Text className="text-base text-gray-500">{`周 星期`}</Text>
          <Text className="text-base text-[#1483FD]">{weekday}</Text>
        </View>
      </View>

      {/* 早宣告计划部分 */}
      <View className="mb-4 overflow-hidden rounded-xl bg-white">
        <LinearGradient
          colors={['#20B4F3', '#5762FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex h-[38px] flex-col items-start  justify-center rounded-t-xl px-4"
          style={{
            boxShadow: '0px 6px 10px 0px rgba(20, 131, 253, 0.40)',
          }}>
          <Text
            className="text-white"
            style={{
              fontSize: 16,
              fontWeight: '800',
              lineHeight: 20,
            }}>
            早宣告
          </Text>
        </LinearGradient>

        <View className="p-4">
          {timeSlots.map((section, sectionIndex) => (
            <View key={section.title} className="mb-4 flex-row">
              <View className="mr-4 h-[80px] flex-row items-center">
                <View
                  className="mr-2 h-8 w-1 rounded-full"
                  style={{ backgroundColor: getBarColor(section.title) }}
                />
                <Text
                  style={{
                    fontFamily: 'Arial',
                  }}
                  className="text-[16px]  font-bold text-gray-700">
                  {section.title} {'\u003A'}
                </Text>
              </View>
              <View className="flex flex-1 flex-col gap-2">
                {section.items.map((item, itemIndex) => (
                  <View
                    key={`${section.title}-${itemIndex}`}
                    className="relative h-[80px] overflow-hidden rounded-[6px]">
                    {/* 光球 */}
                    <View
                      className="absolute bottom-[10px] right-[10px] h-[30px] w-[30px] rounded-full opacity-100"
                      style={{
                        backgroundColor: getBarColor(section.title),
                        filter: 'blur(15px)',
                      }}
                    />
                    <BlurView intensity={10} className="absolute h-full w-full bg-[#1483FD1A]/10" />
                    <TextInput
                      className="z-10 h-[80px] p-3 text-gray-600"
                      placeholder={`请输入${section.title}的计划...`}
                      multiline
                      textAlignVertical="top"
                      value={item.content}
                      onChangeText={(text) => {
                        const newTimeSlots = [...timeSlots];
                        newTimeSlots[sectionIndex].items[itemIndex].content = text;
                        setTimeSlots(newTimeSlots);
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
      {/* 晚总结部分 */}
      <View className="mb-4 overflow-hidden rounded-xl bg-white">
        <LinearGradient
          colors={['#20B4F3', '#5762FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex h-[38px] flex-row items-center justify-between rounded-t-xl px-4"
          style={{
            boxShadow: '0px 6px 10px 0px rgba(20, 131, 253, 0.40)',
          }}>
          <Text
            className="text-white"
            style={{
              fontSize: 16,
              fontWeight: '800',
              lineHeight: 20,
            }}>
            晚总结
          </Text>
          <View className="flex-row items-center">
            <Text className=" text-white">9:00AM</Text>
            <View className="mx-2 flex-row items-center">
              <Image source={timeLogo} className="h-4 w-4" contentFit="contain" />
              <Text className="ml-2 text-white">待完成</Text>
            </View>
          </View>
        </LinearGradient>

        <View className="p-4">
          {eveningReport.map((item, index) => (
            <View key={item.label} className="mb-4 flex flex-row items-start">
              <View className="mt-3 w-12 flex-row justify-between">
                {[...item.label].map((char, i) => (
                  <Text key={i} className="text-[14px] font-medium text-gray-700">
                    {char}
                  </Text>
                ))}
              </View>
              <Text className="mt-3 px-1 text-sm font-medium text-gray-700">:</Text>
              <View className="relative flex-1  overflow-hidden rounded-[6px]">
                {/* <View
                  className="absolute bottom-[10px] right-[10px] h-[30px] w-[30px] rounded-full opacity-100"
                  style={{
                    backgroundColor: '#440063',
                    filter: 'blur(15px)',
                  }}
                /> */}
                <BlurView intensity={10} className="absolute h-full w-full bg-[#1483FD1A]/10" />
                <TextInput
                  className="z-10 min-h-[54px] p-3 text-gray-600"
                  placeholder={`请输入${item.label}...`}
                  multiline
                  textAlignVertical="top"
                  value={item.value}
                  onChangeText={(text) => {
                    const newReport = [...eveningReport];
                    newReport[index].value = text;
                    setEveningReport(newReport);
                  }}
                />
              </View>
            </View>
          ))}
          {/* 提交按钮和提醒信息保持不变 */}
          {eveningStatus === 'pending' && (
            <LinearGradient
              colors={['#20B4F3', '#5762FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex h-[40px] flex-col items-center justify-center rounded-[6px] px-4"
              style={{
                boxShadow: '0px 6px 10px 0px rgba(20, 131, 253, 0.40)',
              }}>
              <Text className="font-semibold text-white">提交</Text>
            </LinearGradient>
          )}
        </View>
      </View>

      {/* 今日成果部分 */}
      <View className="mb-4 overflow-hidden rounded-xl bg-white">
        <LinearGradient
          colors={['#20B4F3', '#5762FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex h-[38px] flex-col items-start  justify-center rounded-t-xl px-4"
          style={{
            boxShadow: '0px 6px 10px 0px rgba(20, 131, 253, 0.40)',
          }}>
          <Text
            className="text-white"
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '700',
              lineHeight: 20,
            }}>
            今日成果
          </Text>
        </LinearGradient>

        <View className="p-4">
          <Text className="mb-2  text-[16px]  font-[800] text-black">总目标</Text>
          <View className="relative mb-4  overflow-hidden rounded-[6px]">
            <BlurView intensity={10} className="absolute h-full w-full bg-[#1483FD1A]/10" />
            <TextInput
              className="z-10 min-h-[47px] p-3 text-gray-600"
              placeholder="请输入总目标..."
              multiline
              value={dailyResult.totalGoal}
              onChangeText={(text) => setDailyResult((prev) => ({ ...prev, totalGoal: text }))}
            />
          </View>

          <View className="mt-6 flex-row justify-between gap-2">
            <View className="flex-1 items-center">
              <Text
                className="mb-2"
                style={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                周累计应达成/实际达成
              </Text>
              <View className="flex h-[70px] w-full items-center justify-center overflow-hidden rounded-[6px]">
                {/* 右上角光球 */}
                <View
                  className="absolute left-0 top-[10px] h-[30px] w-[30px] rounded-full opacity-100"
                  style={{
                    backgroundColor: '#1483FD',
                    filter: 'blur(25px)',
                  }}
                />
                <BlurView intensity={10} className="absolute h-full w-full bg-[#1483FD0D]" />
                <Text
                  style={{
                    color: '#1483FD',
                    fontFamily: 'Roboto',
                    fontSize: 24,
                    fontWeight: '700',
                    zIndex: 1,
                  }}>
                  {dailyResult.monthlyProgress}
                </Text>
              </View>
            </View>
            <View className="flex-1 items-center">
              <Text
                className="mb-2"
                style={{
                  color: 'rgba(0, 0, 0, 0.50)',
                  fontFamily: 'Roboto',
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                本周宣告/实际达成
              </Text>
              <View className="flex h-[70px] w-full items-center justify-center overflow-hidden rounded-[6px]">
                <View
                  className="absolute left-0 top-[10px] h-[30px] w-[30px] rounded-full opacity-100"
                  style={{
                    backgroundColor: '#1483FD',
                    filter: 'blur(25px)',
                  }}
                />
                <BlurView intensity={10} className="absolute h-full w-full bg-[#1483FD0D]" />
                <Text
                  style={{
                    color: '#1483FD',
                    fontFamily: 'Roboto',
                    fontSize: 24,
                    fontWeight: '700',
                    zIndex: 1,
                  }}>
                  {dailyResult.monthlyProgress}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// 首先在组件外定义类型
type TimeSlotItem = {
  content: string;
  time: string;
};

type TimeSlotSection = {
  title: string;
  items: TimeSlotItem[];
};

// 在组件内添加状态

// 渲染部分
