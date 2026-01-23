import { motion } from 'motion/react';
import { useMemo } from 'react';
import { useAccessibility } from '../contexts/AccessibilityContext';

interface Node {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function NetworkLines() {
  const { settings } = useAccessibility();
  const shouldAnimate = !settings.reduceMotion;
  const nodes = useMemo(() => {
    const nodeArray: Node[] = [];
    for (let i = 0; i < 15; i++) {
      nodeArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4,
      });
    }
    return nodeArray;
  }, []);

  // Generate connection lines between nearby nodes
  const connections = useMemo(() => {
    const connectionArray: { from: Node; to: Node }[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = Math.sqrt(
          Math.pow(nodes[i].x - nodes[j].x, 2) + Math.pow(nodes[i].y - nodes[j].y, 2)
        );
        // Only connect nodes that are close to each other
        if (distance < 30) {
          connectionArray.push({ from: nodes[i], to: nodes[j] });
        }
      }
    }
    return connectionArray;
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {/* Connection lines */}
        {connections.map((conn, index) => (
          <motion.line
            key={`line-${index}`}
            x1={`${conn.from.x}%`}
            y1={`${conn.from.y}%`}
            x2={`${conn.to.x}%`}
            y2={`${conn.to.y}%`}
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1"
            initial={shouldAnimate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 0.2 }}
            animate={shouldAnimate ? { 
              pathLength: [0, 1, 0],
              opacity: [0, 0.3, 0],
            } : {
              pathLength: 1,
              opacity: 0.2,
            }}
            transition={shouldAnimate ? {
              duration: 4,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            } : { duration: 0 }}
          />
        ))}
      </svg>

      {/* Nodes */}
      {nodes.map((node) => (
        <motion.div
          key={`node-${node.id}`}
          className="absolute rounded-full"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
          }}
          initial={shouldAnimate ? { scale: 0 } : { scale: 1 }}
          animate={shouldAnimate ? {
            scale: [1, 1.5, 1],
            backgroundColor: [
              'rgba(255, 255, 255, 0.4)',
              'rgba(0, 102, 255, 0.6)',
              'rgba(255, 255, 255, 0.4)',
            ],
            boxShadow: [
              '0 0 0px rgba(0, 102, 255, 0)',
              '0 0 20px rgba(0, 102, 255, 0.8)',
              '0 0 0px rgba(0, 102, 255, 0)',
            ],
          } : {
            scale: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            boxShadow: '0 0 0px rgba(0, 102, 255, 0)',
          }}
          transition={shouldAnimate ? {
            duration: 3,
            repeat: Infinity,
            delay: node.id * 0.2,
            ease: 'easeInOut',
          } : { duration: 0 }}
        />
      ))}
    </div>
  );
}
