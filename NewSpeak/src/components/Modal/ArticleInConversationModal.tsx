import React, { useState, useEffect } from 'react';
import useArticleStore from '../../store/ArticleStore';
import useArticleApi from '../../apis/ArticleApi';
import styles from './ArticleInConversationModal.module.scss';
import LoadingModal from './LoadingModal';

interface Sentence {
  id: number;
  content: string;
}

interface ArticleSentences {
  sentences: Sentence[];
}

const ArticleInConversationModal = () => {
  const { articleMeta } = useArticleStore();
  const [articleSentences, setArticleSentences] =
    useState<ArticleSentences | null>(null);

  const handleGetArticleDetail = async (articleId: number) => {
    const response = await useArticleApi.getArticleDetail(articleId);

    if (response && response.sentences) {
      const sentences = response.sentences;
      setArticleSentences({ sentences });
    }
  };

  useEffect(() => {
    if (articleMeta && articleMeta.id) {
      handleGetArticleDetail(articleMeta.id);
    }
  }, [articleMeta]);

  return (
    <>
      <div className={styles.articleContent} onClick={e => e.stopPropagation()}>
        {articleSentences ? (
          articleSentences.sentences.map((sentence, index) => (
            <div key={sentence.id} className={styles.sentenceContainer}>
              <p className={styles.sentence}>{sentence.content}</p>
            </div>
          ))
        ) : (
          <LoadingModal />
        )}
      </div>
    </>
  );
};

export default ArticleInConversationModal;
