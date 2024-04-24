// custom_hooks/useTruncateText.js
import { useMemo } from 'react';

const useTruncateText = (text, maxLength) => {
  const truncatedText = useMemo(() => {
    if (!text) {
      return '';
    }

    if (text.length <= maxLength) {
      return text;
    }

    return text.substring(0, maxLength) + '...';
  }, [text, maxLength]);

  return truncatedText;
};

export default useTruncateText;





// import { useMemo } from 'react';

// const useTruncateText = (text, maxLength) => {
//   const truncatedText = useMemo(() => {
//     if (text.length <= maxLength) {
//       return text;
//     }
//     return text.substring(0, maxLength) + '...';
//   }, [text, maxLength]);

//   return truncatedText;
// };

// export default useTruncateText;
