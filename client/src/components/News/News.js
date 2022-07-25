import React from 'react';
// import useStyles from './styles'
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';



const News = () =>{

    //const classes = useStyles();

    return (
        <div>
            <h1>News</h1>
            <ImageList sx={{ width: 960, height: 820 }} cols={2} rowHeight={500} variant='standard'>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`} //  this: {`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}

const itemData = [
    {
      img: 'https://news-pro-articles.s3.us-east-2.amazonaws.com/images/cnn2022-07-25.png',
      title: 'CNN',
    },
    {
      img: 'https://news-pro-articles.s3.us-east-2.amazonaws.com/images/fox2022-07-25.png',
      title: 'Fox',
    },
]

export default News;