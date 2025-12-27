import React from 'react';

export interface ServiceItem {
  title: { en: string; fr: string };
  description: { en: string; fr: string };
  icon: string;
}

export interface FeatureCard {
  id: string;
  title: { en: string; fr: string };
  tag: string;
  content: { en: string; fr: string };
  icon: string;
}

export interface ApproachStep {
  stage: string;
  label: { en: string; fr: string };
  details: { en: string; fr: string };
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon: string;
        width?: string | number;
        height?: string | number;
        rotate?: string | number;
        flip?: string;
        mode?: string;
        inline?: boolean;
        [key: string]: any;
      };
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        icon: string;
        width?: string | number;
        height?: string | number;
        rotate?: string | number;
        flip?: string;
        mode?: string;
        inline?: boolean;
        [key: string]: any;
      };
    }
  }
  
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}