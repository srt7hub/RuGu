import { Infinity } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import dressCodeImg from './assets/images/dress_code.webp';

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
  const emptyDays: null[] = [];
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
              backgroundImage: `url('/osn1.webp'), url('/osn1.jpg')`,
              y: heroParallax,
            }}
          />

          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative h-full flex flex-col justify-between p-8 sm:p-12 z-10 w-full">

            {/* Date Block — появляется сверху */}
            <motion.div
              className="relative z-10 self-start"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <div className="flex flex-col text-white text-[72px] sm:text-[84px] font-light leading-[0.85] tracking-tighter opacity-95">
                <span>31</span>
                <span className="h-[2px] w-12 bg-white/40 my-4 ml-1"></span>
                <span>07</span>
                <span className="h-[2px] w-12 bg-white/40 my-4 ml-1"></span>
                <span>26</span>
              </div>
            </motion.div>

            {/* Names — появляется снизу */}
            <motion.div
              className="relative z-10 self-end text-right"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            >
              <div className="mb-2">
                <h1 className="font-serif italic font-normal text-white text-[40px] sm:text-[48px] leading-tight drop-shadow-md">
                  Руслан <br />
                  <span className="text-3xl opacity-80 font-light drop-shadow-sm">&</span> <br />
                  Гульзифа
                </h1>
              </div>
              <div className="flex justify-end">
                <Infinity className="text-white opacity-80 w-10 h-10 stroke-[1]" aria-hidden="true" />
              </div>
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
              <h3 className="text-[#8F8F8F] text-[13px] uppercase tracking-[0.2em] mb-6 font-medium">Июль</h3>
              <div className="grid grid-cols-7 gap-y-5 gap-x-0 w-full text-center">
                {daysOfWeek.map((day, idx) => (
                  <div key={`header-${idx}`} className="text-[11px] uppercase text-[#8F8F8F] font-medium tracking-wider mb-2">
                    {day}
                  </div>
                ))}
                {emptyDays.map((_, idx) => (
                  <div key={`empty-${idx}`} />
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
                        <span className="text-[#8F8F8F] font-light text-[15px]">{day}</span>
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
        <div className="w-full bg-[#FFFFFF] px-8 pb-16 flex flex-col items-center font-sans">
          <FadeUp>
            <h2 className="font-cursive text-[44px] sm:text-[50px] leading-none text-[#B69B7A] mb-10 opacity-90">
              Программа
            </h2>
          </FadeUp>

          <div className="w-full max-w-[340px] flex flex-col gap-10">
            {[
              { time: '14:30', title: 'Сбор гостей' },
              { time: '15:00', title: 'Церемония бракосочетания' },
              { time: '16:00', title: 'Банкет' },
              { time: '23:00', title: 'Завершение' },
            ].map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="flex items-center w-full">
                  <span className="font-serif italic text-[24px] text-[#9B9B9B] w-[65px] text-left shrink-0">
                    {item.time}
                  </span>
                  <div className="flex-1 flex items-center justify-center px-4 relative">
                    <div className="h-[1px] w-full bg-[#D8D8D8]"></div>
                    <div className="w-1 h-1 rounded-full bg-[#D8D8D8] absolute"></div>
                  </div>
                  <span className="font-sans font-medium text-[14px] sm:text-[15px] text-[#5E5E5E] w-[130px] sm:w-[140px] text-left shrink-0 leading-tight">
                    {item.title}
                  </span>
                </div>
              </FadeUp>
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
                src={dressCodeImg}
                alt="Примеры нарядов в цветах дресс-кода"
                className="w-full h-auto object-contain mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </FadeUp>
        </div>

        {/* BLOCK 5.5: Countdown */}
        <div className="w-full bg-[#FFFFFF] px-8 py-16 flex flex-col items-center text-center font-sans">
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
            <p className="text-[#8F8F8F] text-[14px] sm:text-[15px] leading-[1.6] max-w-[320px] mx-auto font-light">
              С нетерпением ждем этот день вместе с вами
            </p>
          </FadeUp>
        </div>

        {/* BLOCK 6: Telegram */}
        <div className="w-full bg-[#FFFFFF] px-8 py-16 flex flex-col items-center text-center font-sans">
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
        <div className="w-full bg-[#FFFFFF] pt-16 flex flex-col items-center text-center font-sans">
          <FadeUp>
            <div className="mb-14 px-8">
              <h2 className="font-cursive text-[40px] sm:text-[46px] leading-tight text-[#B69B7A] opacity-90">
                Будем вас ждать!<br />
                С любовью,<br />
                Руслан и Гульзифа.
              </h2>
            </div>
          </FadeUp>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 1.04 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <picture>
              <source srcSet="/osn2.webp" type="image/webp" />
              <img
                src="/osn2.png"
                alt="Свадебные цветы"
                className="w-full h-auto aspect-[3/4] object-cover"
                loading="lazy"
              />
            </picture>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
