import { motion } from 'framer-motion';

export function FadeTransition({
  children,
  className,
  duration = 1.5,
  ease = 'easeOut',
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  ease?: string | number[];
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration,
        ease,
      }}
    >
      {children}
    </motion.div>
  );
}
