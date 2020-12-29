const Recipe = ({title, image, url, labels}) => {
    return(
        <div className='recipe'>
            <div className='info-box'>
                {title}
            </div>
            <div className='image-box'>
                <p>
                    {labels}
                </p>
                <a href={url}><img src={image} alt={title} /></a>
            </div>
        </div>
    )
}

export default Recipe;