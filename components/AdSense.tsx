import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSenseAdProps {
  adSlot: string;
  adFormat?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ 
  adSlot, 
  adFormat = 'auto', 
  style = { display: 'block' },
  className = ''
}) => {
  useEffect(() => {
    try {
      // Initialize adsbygoogle if not already done
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXXX" // Replace with your AdSense publisher ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

// Pre-configured ad components for common use cases
export const BannerAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSenseAd 
    adSlot="1234567890" 
    adFormat="horizontal"
    style={{ display: 'block', textAlign: 'center' }}
    className={`banner-ad ${className}`}
  />
);

export const SidebarAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSenseAd 
    adSlot="0987654321" 
    adFormat="rectangle"
    style={{ display: 'block', width: '300px', height: '250px' }}
    className={`sidebar-ad ${className}`}
  />
);

export const InContentAd: React.FC<{ className?: string }> = ({ className = '' }) => (
  <AdSenseAd 
    adSlot="1122334455" 
    adFormat="fluid"
    style={{ display: 'block', textAlign: 'center', margin: '20px 0' }}
    className={`in-content-ad ${className}`}
  />
);

export const ResponsiveAd: React.FC<{ adSlot: string; className?: string }> = ({ 
  adSlot, 
  className = '' 
}) => (
  <AdSenseAd 
    adSlot={adSlot} 
    adFormat="auto"
    style={{ display: 'block' }}
    className={`responsive-ad ${className}`}
  />
);

export default AdSenseAd;