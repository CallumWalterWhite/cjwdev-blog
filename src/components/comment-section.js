import React from 'react';
import Giscus from '@giscus/react';

const CommentSection = ({ title} ) => {
  return (
    <Giscus
      repo="CallumWalterWhite/cjwdev-blog"
      repoId="R_kgDOJUZwSw"
      category="General"
      categoryId="DIC_kwDOJUZwS84CobHN"
      mapping={title} 
      reactionsEnabled="1"
      emitMetadata="0"
      theme="dark"
    />
  );
};

export default CommentSection;