import React, { useState, useEffect } from 'react';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

function ShareSection(props) {
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (downloading) {
      const downloadImage = async () => {
        try {
          const uri = props.stageRef.current.toDataURL({ pixelRatio: 3 });
          const link = document.createElement('a');
          link.href = uri;
          link.download = 'zoomer-pfp.png';

          // Workaround specifically for iOS Safari
          if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = uri;
            img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              canvas.toBlob((blob) => {
                const newURL = URL.createObjectURL(blob);
                const newLink = document.createElement('a');
                newLink.href = newURL;
                newLink.download = 'zoomer-pfp.png';
                document.body.appendChild(newLink);
                newLink.click();
                document.body.removeChild(newLink);
                URL.revokeObjectURL(newURL);
                setDownloading(false);
              }, 'image/png');
            };
          } else {
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setDownloading(false);
          }
        } catch (error) {
          console.error("Error during image download:", error);
          setDownloading(false);
        }
      };

      downloadImage();
    }
  }, [downloading, props]);

  const handleExport = () => {
    props.removeSelected();
    setDownloading(true);
  };

  return (
    <div className='itemsSection'>
      <div className='shareSectionWrap'>
        <button onClick={handleExport} className='downloadImage'>
          <DownloadRoundedIcon />
          Download Image
        </button>
      </div>
    </div>
  );
}

export default ShareSection;