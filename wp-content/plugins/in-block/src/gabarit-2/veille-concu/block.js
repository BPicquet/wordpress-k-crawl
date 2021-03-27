import { PLUGIN_NAME } from '../../constants'
import './style-veille.scss'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, InnerBlocks, PlainText } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/veille-concu` // modifier

registerBlockType(BLOCK_NAME, {
  title: __('gabarit2 title and img'),
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
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, switchDisplay, title, subtitle }, setAttributes, className } = props
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
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Subtitle')}
              className={className}
              value={subtitle}
              onChange={(param1) => {
                setAttributes({ subtitle: param1 })
              }}
            />

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

  save: ({ attributes: { imageUrl, title, subtitle } }) => (
    <div className='veille-concurentielle'>
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <img src={imageUrl} alt='' />
    </div>
  )
})
