import { Infinity } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

// Fade-up при скролле — переиспользуем для каждого блока
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const daysOfWeek = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
  const daysInMonth = Array.from({ length: 12 }, (_, i) => i + 20);

  const targetDate = new Date('2026-07-31T14:30:00+05:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Параллакс для Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], ['0%', '25%']);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center sm:py-10 relative font-serif">
      {/* Decorative Background Texture */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none hidden sm:block"
        style={{ backgroundImage: 'radial-gradient(#D4CDC1 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Main App Canvas */}
      <div className="w-full max-w-[500px] flex flex-col sm:shadow-2xl sm:border border-white/30 z-10 relative bg-white overflow-hidden">

        {/* BLOCK 1: Hero */}
        <div
          ref={heroRef}
          className="relative w-full h-[100svh] sm:h-[720px] bg-[#EAE3D9] flex flex-col justify-between overflow-hidden"
        >
          {/* Параллакс-фон */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url('/fon1.jpg')`,
              y: heroParallax,
            }}
          />

          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative h-full z-10 w-full">

            {/* Date — правый верхний угол, крупные цифры */}
            <motion.div
              className="absolute top-8 right-8 sm:top-12 sm:right-12 text-right"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="flex flex-col items-end text-white text-[72px] sm:text-[84px] font-light leading-[0.85] tracking-tighter opacity-95">
                <span>31</span>
                <span className="h-[2px] w-12 bg-white/40 my-4 mr-1"></span>
                <span>07</span>
                <span className="h-[2px] w-12 bg-white/40 my-4 mr-1"></span>
                <span>26</span>
              </div>
            </motion.div>

            {/* Names — левый нижний угол */}
            <motion.div
              className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            >
              <h1 className="font-serif italic font-normal text-white text-[40px] sm:text-[48px] leading-tight drop-shadow-md mb-3">
                Руслан<br />
                <span className="text-3xl opacity-80 font-light not-italic">&amp;</span><br />
                Гульзифа
              </h1>
              <Infinity className="text-white/80 w-10 h-10 stroke-[1]" aria-hidden="true" />
            </motion.div>

          </div>
        </div>

        {/* BLOCK 2: Invitation & Calendar */}
        <div className="w-full bg-[#FFFFFF] px-8 py-16 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-10 opacity-90">
              Дорогие гости!
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-[#5E5E5E] text-[15px] sm:text-[16px] leading-[1.8] max-w-[340px] mx-auto font-light mb-12">
              Один из дней этого лета станет самым важным в нашей жизни, и мы хотим провести его вместе с вами. Приглашаем вас на нашу свадьбу, которая состоится:
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="text-[28px] sm:text-[32px] text-[#B69B7A] font-medium tracking-widest mb-16">
              31.07.26
            </div>
          </FadeUp>

          {/* Calendar */}
          <FadeUp delay={0.3} className="w-full">
            <div className="w-full max-w-[380px] mx-auto flex flex-col">
              <h3 className="text-[#8F8F8F] text-[13px] uppercase tracking-[0.2em] mb-4 font-medium">Июль</h3>
              <div className="grid grid-cols-7 gap-y-4 gap-x-0 w-full text-center">
                {daysOfWeek.map((day, idx) => (
                  <div key={`header-${idx}`} className="text-[11px] uppercase text-[#B69B7A] font-semibold tracking-wider pb-3 border-b border-[#E8E0D5]">
                    {day}
                  </div>
                ))}
                {daysInMonth.map((day) => {
                  const isWeddingDay = day === 31;
                  return (
                    <div key={`day-${day}`} className="relative flex items-center justify-center w-full aspect-square">
                      {isWeddingDay ? (
                        <>
                          <svg className="absolute w-[180%] h-[180%] text-[#B69B7A] z-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          <span className="relative z-10 text-white font-semibold text-[15px]">{day}</span>
                        </>
                      ) : (
                        <span className="text-[#5E5E5E] font-light text-[15px]">{day}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* BLOCK 3: Location */}
        <div className="w-full bg-[#FFFFFF] px-8 pb-16 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-8 opacity-90">
              Место
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-[#5E5E5E] text-[15px] sm:text-[16px] leading-[1.8] max-w-[340px] mx-auto font-light mb-10">
              с.Аскарово,<br />
              Парк "Урал-батыр"
            </p>
          </FadeUp>

          {/* Location Photos */}
          <FadeUp delay={0.15}>
            <div className="flex w-full gap-3 mb-14">
              <picture className="flex-1 w-1/2 overflow-hidden">
                <source srcSet="/a1.webp" type="image/webp" />
                <img
                  src="/a1.jpg"
                  alt="Парк Урал-батыр, вид 1"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </picture>
              <picture className="flex-1 w-1/2 overflow-hidden">
                <source srcSet="/a2.webp" type="image/webp" />
                <img
                  src="/a2.jpg"
                  alt="Парк Урал-батыр, вид 2"
                  className="w-full aspect-[3/4] object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </picture>
            </div>
          </FadeUp>

          <FadeUp delay={0.25} className="w-full flex justify-center">
            <a
              href="https://yandex.ru/maps/org/ural_batyr/115161060704/?ll=58.585633%2C53.322902&mode=search&sll=58.453798%2C53.322808&source=serp_navig&text=парк%20урал%20батыр%20аскарово&z=11"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[70%] text-center inline-block bg-[#B39472] hover:bg-[#9a7e60] transition-colors rounded-full py-[18px] text-white text-[13px] uppercase tracking-[0.15em] font-semibold"
            >
              Карта
            </a>
          </FadeUp>
        </div>

        {/* BLOCK 4: Program */}
        <div className="w-full bg-[#FAF9F6] px-8 py-16 flex flex-col items-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-14 opacity-90 text-center">
              Программа
            </h2>
          </FadeUp>

          <div className="w-full max-w-[320px] relative">
            {/* Вертикальная золотая линия */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#C9B89A] to-transparent"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {[
              { time: '14:30', title: 'Сбор\nгостей', icon: '✦', side: 'left' },
              { time: '15:00', title: 'Церемония\nбракосочетания', icon: '♡', side: 'right' },
              { time: '16:00', title: 'Банкет', icon: '✦', side: 'left' },
              { time: '23:00', title: 'Завершение', icon: '✦', side: 'right' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="relative flex items-center mb-9 last:mb-0"
                initial={{ opacity: 0, x: item.side === 'left' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: idx * 0.15 }}
              >
                {item.side === 'left' ? (
                  <>
                    <div className="flex-1 text-right pr-4">
                      <p className="font-serif italic text-[28px] text-[#B69B7A] leading-none mb-0.5">{item.time}</p>
                      <p className="font-sans text-[15px] text-[#5E5E5E] font-light leading-snug whitespace-pre-line">{item.title}</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white border border-[#C9B89A] flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <span className="text-[#B69B7A] text-[9px]">{item.icon}</span>
                    </div>
                    <div className="flex-1 pl-4" />
                  </>
                ) : (
                  <>
                    <div className="flex-1 pr-4" />
                    <div className="w-7 h-7 rounded-full bg-white border border-[#C9B89A] flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <span className="text-[#B69B7A] text-[9px]">{item.icon}</span>
                    </div>
                    <div className="flex-1 text-left pl-4">
                      <p className="font-serif italic text-[28px] text-[#B69B7A] leading-none mb-0.5">{item.time}</p>
                      <p className="font-sans text-[15px] text-[#5E5E5E] font-light leading-snug whitespace-pre-line">{item.title}</p>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* BLOCK 5: Dress Code */}
        <div className="w-full bg-[#FFFFFF] px-8 py-16 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-8 opacity-90">
              Дресс-код
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-[#555555] text-[14px] sm:text-[15px] leading-[1.6] max-w-[320px] mx-auto font-light mb-12">
              Нам будет приятно, если вы поддержите стилистику нашей свадьбы и используете в ваших нарядах предложенные цвета:
            </p>
          </FadeUp>

          {/* Color Palette */}
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-16">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#361314] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"></div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#602226] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"></div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#4E3A2D] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"></div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#665448] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"></div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B59E83] shadow-[0_2px_8px_rgba(0,0,0,0.06)]"></div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#E9DBC6] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/5"></div>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="w-full max-w-[380px] mx-auto mb-10">
              <img
                src="/q1.png"
                alt="Примеры нарядов в цветах дресс-кода"
                className="w-full h-auto object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </FadeUp>
        </div>

        {/* BLOCK 5.5: Countdown */}
        <div className="w-full bg-[#FFFFFF] px-8 pt-2 pb-16 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-10 opacity-90">
              До нашего дня осталось
            </h2>
          </FadeUp>

          <FadeUp delay={0.15} className="w-full flex justify-center">
            <div
              className="flex justify-between w-full max-w-[340px] mb-12"
              role="timer"
              aria-live="polite"
              aria-label="Обратный отсчёт до свадьбы"
            >
              {[
                { value: timeLeft.days, label: 'Дней' },
                { value: timeLeft.hours, label: 'Часов' },
                { value: timeLeft.minutes, label: 'Минут' },
                { value: timeLeft.seconds, label: 'Секунд' },
              ].map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-[40px] sm:text-[46px] font-light text-[#4E3A2D] leading-none mb-3">
                    {String(value).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-[#8F8F8F] font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-[#8F8F8F] text-[14px] sm:text-[15px] leading-[1.6] font-light whitespace-nowrap">
              С нетерпением ждем этот день вместе с вами
            </p>
          </FadeUp>
        </div>

        {/* BLOCK 6: Telegram */}
        <div className="w-full bg-[#FFFFFF] px-8 pt-8 pb-16 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-12 opacity-90">
              Свадебный чат
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="text-[#5E5E5E] text-[14px] sm:text-[15px] leading-[1.7] max-w-[340px] mx-auto font-light mb-14">
              Телеграмм-чат с новостями, событиями, а также в чате будет вся актуальная информация и если будут какие-либо изменения, то мы обязательно оповестим Вас.<br />
              Будем рады видеть ваши фото и видео с торжества!
            </p>
          </FadeUp>

          <FadeUp delay={0.2} className="w-full flex justify-center">
            <a
              href="https://t.me/+bHgdVw3inBU2ZjMy"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[70%] text-center inline-block bg-[#B39472] hover:bg-[#9a7e60] transition-colors rounded-full py-[18px] text-white text-[13px] uppercase tracking-[0.15em] font-semibold"
            >
              Telegram — чат
            </a>
          </FadeUp>
        </div>

        {/* BLOCK 7: Final message */}
        <div className="w-full bg-[#F5EFE6] py-20 px-8 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[40px] sm:text-[46px] leading-tight text-[#B69B7A] mb-10">
              Будем вас ждать!<br />
              С любовью,<br />
              Руслан и Гульзифа.
            </h2>
          </FadeUp>

          {/* Decorative divider */}
          <FadeUp delay={0.15}>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-[1px] bg-[#C9B89A]" />
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#B69B7A]">
                <rect x="6" y="0" width="8.485" height="8.485" rx="0.5" transform="rotate(45 6 0)" fill="currentColor" />
              </svg>
              <div className="w-16 h-[1px] bg-[#C9B89A]" />
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <p className="text-[#B69B7A] text-[52px] sm:text-[64px] font-light tracking-[0.1em] font-serif leading-none">
              31 · 07 · 2026
            </p>
          </FadeUp>
        </div>

      </div>
    </div>
  );
}
