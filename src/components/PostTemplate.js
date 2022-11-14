// Libs
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styles
const Container = styled.section`
  width: 100%;
  padding: 4rem 0;
  background: transparent linear-gradient(180deg, #FFFAE4 10%, #FFFFFF 90%) 0% 0%;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  max-width: 1440px;

  @media (max-width: 480px) {
    flex-direction: column;
    width: calc(100% - 80px);
  }
`;

const Title = styled.h2`
  width: 80%;
  margin: 0;
  margin-bottom: 1.5rem;
  font: 600 3.75rem 'Soleto', sans-serif;
  line-height: 4.1875rem;
  color: #22254B;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const AuthorBox = styled.div`
  display: flex;
  width: 100%;
`;

const PictureBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #22254B;
  border-radius: 20px;
  margin-right: .46875rem;
  overflow: hidden;
`;

const Picture = styled.img`
  width: 100%;
`;

const DetailsBox = styled.div``;

const AuthorName = styled.p`
  margin: 0;
  font: 400 .9375rem 'Soleto', sans-serif;
  color: #5321C4;
  line-height: 1.375rem;
`;

const PostDate = styled.p`
  margin: 0;
  font: 300 .9375rem 'Soleto', sans-serif;
  color: #22254B;
  line-height: 1.375rem;
`;

const PostDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const Introduction = styled.p`
  width: calc(50% - 1.5rem);
  margin: 0;
  margin-top: 1rem;
  font: 300 1.375rem 'Soleto', sans-serif;
  line-height: 1.875rem;
  color: #22254B;

  @media (max-width: 1024px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(50% - 1.5rem);
  height: 17.6875rem;
  border: 1px solid #CAAAE5;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 1024px) {
    height: 14.6875rem;
  }

  @media (max-width: 768px) {
    width: 65%;
    height: 13.6875rem;
    margin: 3rem 0 2rem;
  }

  @media (max-width: 480px) {
    width: 90%;
    height: 9.6875rem;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const PostContent = styled.div`
  width: 60%;
  margin: 7rem 0;
  color: #22254B;
  font-family: 'Soleto', sans-serif;

  h2 {
    margin: 4rem 0 2rem;
    font: 600 1.875rem 'Soleto', sans-serif;
  }

  p {
    font: 400 1.0625rem 'Soleto', sans-serif;
    line-height: 1.7625rem;
  }

  img {
    width: 90%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PostTemplate = ({ pageContext }) => {
  const [widthSize, setWidthSize] = useState('');

  const hasWindow = typeof window !== 'undefined';
  const isMobile = widthSize <= 480;

  const handleWidthSize = () => {
    const widthViewPort = document.documentElement.clientWidth;

    setWidthSize(widthViewPort);
  }

  useEffect(() => {
    if (hasWindow) {
      handleWidthSize();
      window.addEventListener('resize', handleWidthSize);

      return () => {
        window.removeEventListener('resize', handleWidthSize);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const renderContent = () => {
    const dateSplit = pageContext.date.split('-');
    const date = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);

    const lang = pageContext.language === 'pt-BR' ? 'pt-BR' : 'en-US';

    const postDate = date.toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' });

    return (
      <Wrapper>
        <Title>
          {pageContext.title}
        </Title>
        <AuthorBox>
          <PictureBox>
            <Picture
              src={pageContext.authorPicture?.url}
              alt='Author picture'
            />
          </PictureBox>
          <DetailsBox>
            <AuthorName>{pageContext.author}</AuthorName>
            <PostDate>{postDate}</PostDate>
          </DetailsBox>
        </AuthorBox>
        <PostDetails>
          <Introduction>{pageContext.intro}</Introduction>
          <ImageContainer>
            <Image
              src={pageContext.coverImage?.url}
              alt='Publication cover'
            />
          </ImageContainer>
        </PostDetails>
        <PostContent
          dangerouslySetInnerHTML={{ __html: pageContext.content.html }}
        />
      </Wrapper>
    );
  }

  return (
    <Container>
      {renderContent()}
    </Container>
  );
};

export default PostTemplate;