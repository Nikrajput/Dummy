/**
 * SEO component for the frontend
 */

import React from 'react'
import Helmet from 'react-helmet'

import { 
  REACT_APP_SITE_DESCRIPTION,
  REACT_APP_SITE_IMAGE,
  REACT_APP_SITE_NAME,
  REACT_APP_SITE_TWITTER,
} from '../../utils/constants'

const SEO = ({ description, image, lang, meta, title }) => {

  const formatedTitle = title ? `${title} | ${REACT_APP_SITE_NAME}` : REACT_APP_SITE_NAME

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={formatedTitle}
      meta={[
        {
          name: `description`,
          content: description ? description : REACT_APP_SITE_DESCRIPTION,
        },
        {
          name: `image`,
          content: image ? image : REACT_APP_SITE_IMAGE,
        },
        {
          property: `og:description`,
          content: description ? description : REACT_APP_SITE_DESCRIPTION,
        },
        {
          name: `og:image`,
          content: image ? image : REACT_APP_SITE_IMAGE,
        },
        {
          property: `og:title`,
          content: formatedTitle,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: REACT_APP_SITE_TWITTER,
        },
        {
          name: `twitter:title`,
          content: formatedTitle,
        },
        {
          name: `twitter:description`,
          content: description ? description : REACT_APP_SITE_DESCRIPTION,
        },
        {
          name: `twitter:image:src`,
          content: image ? image : REACT_APP_SITE_IMAGE,
        }
      ].concat(meta)}
    >
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
}

export default SEO