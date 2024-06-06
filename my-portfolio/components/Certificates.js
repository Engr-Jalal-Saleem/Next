import { useEffect, useState } from 'react';
import { motion, useAnimation, cubicBezier } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCertificate } from 'react-icons/fa';

const CertificateCard = ({ title, description, link, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: '-50px 0px' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: cubicBezier(0.6, 0.05, -0.01, 0.9),
        delay: index * 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: 'spring', stiffness: 200, damping: 10, delay: index * 0.2 + 0.3 }
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: { duration: 0.6, ease: cubicBezier(0.6, 0.05, -0.01, 0.9), delay: index * 0.2 + 0.1 }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 duration-300 ease-in-out relative overflow-hidden group"
    >
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-purple-700 origin-top"
      />
      <motion.div
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-4 right-4 text-3xl text-purple-500 dark:text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity"
      >
        <FaCertificate />
      </motion.div>
      <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors text-xl mb-4">{description}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Verify
        </button>
      </a>
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-tl-full opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
    </motion.div>
  );
};

const Certificates = ({ title = 'Certificates', items = [], isDarkModeForced = null }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    if (isDarkModeForced !== null) {
      setIsDarkMode(isDarkModeForced);
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (isDarkModeForced === null) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [isDarkModeForced]);

  const titleControls = useAnimation();
  const [titleRef, titleInView] = useInView({ triggerOnce: true, rootMargin: '-100px 0px' });

  useEffect(() => {
    if (titleInView) {
      titleControls.start('visible');
    }
  }, [titleControls, titleInView]);

  const titleVariants = {
    hidden: { opacity: 0, y: -50, rotateX: 20 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: cubicBezier(0.6, 0.05, -0.01, 0.9) }
    }
  };

  const defaultItems = [
    { title: 'Data Analyst and Business Intelligence', description: 'Completed a comprehensive data analysis course using Python from DigiSkills.', link: 'https://digiskills.pk/verify/' },
    { title: 'Data Analyst Skillpath: Excel, SQL & ML with Python in हिंदी', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://www.udemy.com/certificate/UC-94cab125-cd34-4e1b-b99d-bdc3091d4c6f/' },
    { title: 'Communication and Soft Skills', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://digiskills.pk/verify/' },
    { title: 'Freelancing', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://digiskills.pk/verify/' },
    { title: 'Play It Safe: Manage Security Risks', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://www.coursera.org/account/accomplishments/certificate/2A4AUES7GAXD' },
    { title: 'Brain Hacking Presentations Skills', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://www.udemy.com/certificate/UC-aeeaa2bf-7959-42bf-a8f6-9531e9747c73/' },
    { title: 'MATLAB Onramp', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://matlabacademy.mathworks.com/progress/share/certificate.html?id=361f3c11-71ff-4df2-aa61-34c2ea683ced&' },
    { title: 'Creating Video Lessons with Online Video Maker InVideo', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://www.udemy.com/certificate/UC-aeeaa2bf-7959-42bf-a8f6-9531e9747c73/' },
    { title: 'Foundations of Cybersecurity', description: 'Gained expertise in machine learning algorithms and techniques through a detailed Coursera course.', link: 'https://www.coursera.org/account/accomplishments/certificate/6AH8D7CPDTRV' },
    { title: 'TypeScript Variables and Data Types', description: 'Learn TypeScript Variables and Different ways to declare them. Understand differences between var, let and const and Scope of variables. Understand TypeScript Data Types.', link: 'https://www.coursera.org/account/accomplishments/verify/YMN65MXM5DJC' }
    ];
    const certificateItems = items.length > 0 ? items : defaultItems;
    return (
      <section
        id="certificates"
        className={`py-24 text-center relative overflow-hidden transition-colors duration-500 ease-in-out ${
          isDarkMode ? 'bg-gradient-to-br from-gray-900 to-black' : 'bg-gradient-to-br from-gray-50 to-gray-100'
        }`}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className={`w-full h-full ${
              isDarkMode ? 'text-gray-800' : 'text-gray-200'
            } opacity-70 transform -scale-x-100`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,224L80,186.7C160,149,320,75,480,80C640,85,800,171,960,192C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.h2
            ref={titleRef}
            variants={titleVariants}
            initial="hidden"
            animate={titleControls}
            className={`text-4xl font-extrabold mb-8 inline-block relative ${
              isDarkMode ? 'text-purple-400' : 'text-gray-900'
            }`}
          >
            {title}
            <motion.span
              className={`absolute -bottom-2 left-0 w-full h-1 ${
                isDarkMode ? 'bg-purple-500' : 'bg-purple-600'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isLoaded ? 1 : 0 }}
              transition={{ duration: 1, ease: cubicBezier(0.6, 0.05, -0.01, 0.9), delay: 0.5 }}
            />
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificateItems.map((certificate, index) => (
              <CertificateCard key={certificate.title} {...certificate} index={index} />
            ))}
          </div>
        </div>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`fixed bottom-4 right-4 p-3 rounded-full text-white transition-all duration-500 ease-in-out transform hover:scale-110 hover:rotate-12 ${
            isDarkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
      </section>
    );
    };
    export default Certificates;