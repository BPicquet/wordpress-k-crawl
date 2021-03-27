import { PLUGIN_NAME } from '../../constants'
import './style.scss'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, InnerBlocks, PlainText, URLInputButton } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/platform` // modifier

// Ajouter dans index.js
// Commencer par ajouter attribut
// Importer composant (PlainText et URLInputButton et MediaPlaceHolder)
// Remplacer dans edit texte par component PlainText, lien URLInputButton
// Partie save: editer en remplaçant le nom de l'attribut

registerBlockType(BLOCK_NAME, {
  title: __('Categorie & description 3'),
  description: __('Another example with text and image'),
  icon: 'media-document',
  category: 'common',
  attributes: {
    imageUrl: {
      type: 'string'
    },
    imageId: {
      type: 'integer'
    },
    switchDisplay: {
      type: 'boolean',
      default: false
    },
    title: {
      type: 'string'
    },
    subtitle: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    textLink: {
      type: 'string'
    },
    link: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, switchDisplay, title, category, subtitle, textLink, link }, setAttributes, className } = props
    return (
      <>
        <div className='d-flex'>
          <div className='col-1'>
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Category')}
              className={className}
              value={category}
              onChange={(param) => {
                setAttributes({ category: param })
              }}
            />
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Title')}
              className={className}
              value={title}
              onChange={(title) => {
                setAttributes({ title: title })
              }}
            />
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Subtitle')}
              className={className}
              value={subtitle}
              onChange={(param1) => {
                setAttributes({ subtitle: param1 })
              }}
            />
            <div className='d-flex'>
              <PlainText
                keepplaceholderonfocus='true'
                placeholder={__('Texte du lien')}
                className={className}
                value={textLink}
                onChange={textLink => setAttributes({ textLink })}
              />
              <URLInputButton
                className={__('link')}
                url={link}
                onChange={link => setAttributes({ link })}
              />
            </div>
          </div>
          <div className='col-2'>
            <div>
              {imageUrl ? (
                <img src={imageUrl} alt='' />
              ) : (
                <MediaPlaceholder
                  onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                  allowedTypes={['image']}
                  multiple={false}
                  labels={{ title: 'The Image' }}
                />
              )}
            </div>
            <div>
              <InnerBlocks allowedBlocks={['core/paragraph']} />
            </div>
          </div>
          <InspectorControls>
            <BaseControl>
              <MediaUpload
                onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
                type='image'
                value={imageId}
                className='file'
                render={({ open }) => (
                  <Button
                    className={!imageUrl && 'button button-large'}
                    onClick={open}
                  >
                    {
                      imageUrl ? (
                        <div className='inspector-controls-flex'>
                          <img className='inspector-controls-flex-img' src={imageUrl} alt='' />
                          <p>{__('Replace image')}</p>
                        </div>
                      ) : (
                        __('Select image')
                      )
                    }
                  </Button>
                )}
              />
            </BaseControl>
            <BaseControl>
              <ToggleControl
                label={__("Alterner l'image et le texte")}
                checked={switchDisplay}
                onChange={(switchDisplay) => { setAttributes({ switchDisplay }) }}
              />
            </BaseControl>
          </InspectorControls>
        </div>
      </>
    )
  },

  save: ({ attributes: { imageUrl, title, subtitle, category, textLink, link } }) => (
    <div className='presentation platform'>
      <div>
        <h3>{category}</h3>
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <div>
          <a className='platform-button' href={link}>{textLink}</a>
        </div>
      </div>
      <img src={imageUrl} alt='' />
    </div>
  )
})
