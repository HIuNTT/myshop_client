import { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from 'utils/cn'

interface CollapseProps {
  isOpen?: boolean
  children?: ReactNode
  className?: string
}

export default function Collapse({ isOpen, children, className }: CollapseProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          variants={{
            open: { height: 'fit-content', opacity: 1 },
            close: { height: 0, opacity: 0 },
          }}
          initial="close"
          animate="open"
          exit="close"
          className={cn('overflow-hidden bg-black/[.02] before:table after:table', className)}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}
