import { PLUGIN_NAME } from '../../constants'
import './style.scss'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { PlainText } = wp.blockEditor

const BLOCK_NAME = `${PLUGIN_NAME}/intelligence-eco` // modifier

// Commencer par ajouter attribut
// Importer composant (PlainText et URLInputButton et MediaPlaceHolder)
// Remplacer dans edit texte par component PlainText, lien URLInputButton
// Partie save: editer en remplaçant le nom de l'attribut

registerBlockType(BLOCK_NAME, {
  title: __('Title and description'),
  description: __('Another example with text and image'),
  icon: 'media-document',
  category: 'common',
  attributes: {
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    },
    description1: {
      type: 'string'
    },
    description2: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { title, subtitle, description1, description2 }, setAttributes, className } = props
    return (
      <>
        <div className='d-flex'>
          <div className='col-1'>
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Title')}
              className={className}
              value={title}
              onChange={(title) => {
                setAttributes({ title: title })
              }}
            />
          </div>
          <div className='col-2'>
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Subtitle')}
              className={className}
              value={subtitle}
              onChange={(param) => {
                setAttributes({ subtitle: param })
              }}
            />
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Description 1')}
              className={className}
              value={description1}
              onChange={(param1) => {
                setAttributes({ description1: param1 })
              }}
            />
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Description 2')}
              className={className}
              value={description2}
              onChange={(param2) => {
                setAttributes({ description2: param2 })
              }}
            />
          </div>
        </div>
      </>
    )
  },

  save: ({ attributes: { title, subtitle, description1, description2 } }) => (
    <div className='intelligence-eco'>
      <h2>{title}</h2>
      <div>
        <h3>{subtitle}</h3>
        <p>{description1}</p>
        <p>{description2}</p>
      </div>
    </div>
  )
})
