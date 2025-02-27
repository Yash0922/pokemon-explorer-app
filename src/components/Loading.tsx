'use client';

import React from 'react';
import Image from 'next/image';

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative w-20 h-20 animate-spin">
        <Image src="/pokeball.svg" alt="Loading" fill />
      </div>
      <p className="mt-4 text-xl font-medium text-gray-700">Loading...</p>
    </div>
  );
};

export default Loading;