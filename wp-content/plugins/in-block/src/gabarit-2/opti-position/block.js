import { PLUGIN_NAME } from '../../constants'
import './style.scss'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { MediaUpload, InspectorControls, MediaPlaceholder, InnerBlocks, PlainText, URLInputButton } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/opti-position` // modifier

registerBlockType(BLOCK_NAME, {
  title: __('gabarit2 block2'),
  description: __('Another example Gabarit 2 / Block 2'),
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
    h31: {
      type: 'string'
    },
    h32: {
      type: 'string'
    },
    h33: {
      type: 'string'
    },
    h34: {
      type: 'string'
    },
    p1: {
      type: 'string'
    },
    p2: {
      type: 'string'
    },
    p3: {
      type: 'string'
    },
    p4: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { imageUrl, imageId, switchDisplay, title, h31, h32, h33, h34, p1, p2, p3, p4 }, setAttributes, className } = props
    return (
      <>
        <div className='d-flex'>

          <div className='col-1'>
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
          <div className='col-2'>
            <PlainText
              keepplaceholderonfocus='true'
              placeholder={__('Title')}
              className={className}
              value={title}
              onChange={(title) => {
                setAttributes({ title: title })
              }}
            />
            <div>
              <div>
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('h3')}
                  className={className}
                  value={h31}
                  onChange={(param) => {
                    setAttributes({ h31: param })
                  }}
                />
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('balise p')}
                  className={className}
                  value={p1}
                  onChange={(param) => {
                    setAttributes({ p1: param })
                  }}
                />
              </div>
              <div>
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('h3')}
                  className={className}
                  value={h32}
                  onChange={(param) => {
                    setAttributes({ h32: param })
                  }}
                />
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('balise p')}
                  className={className}
                  value={p2}
                  onChange={(param) => {
                    setAttributes({ p2: param })
                  }}
                />
              </div>
              <div>
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('h3')}
                  className={className}
                  value={h33}
                  onChange={(param) => {
                    setAttributes({ h33: param })
                  }}
                />
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('balise p')}
                  className={className}
                  value={p3}
                  onChange={(param) => {
                    setAttributes({ p3: param })
                  }}
                />
              </div>
              <div>
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('h3')}
                  className={className}
                  value={h34}
                  onChange={(param) => {
                    setAttributes({ h34: param })
                  }}
                />
                <PlainText
                  keepplaceholderonfocus='true'
                  placeholder={__('balise p')}
                  className={className}
                  value={p4}
                  onChange={(param) => {
                    setAttributes({ p4: param })
                  }}
                />
              </div>
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

  save: ({ attributes: { imageUrl, title, h31, h32, h33, h34, p1, p2, p3, p4 } }) => (
    <div className='optimiser-positionnement'>
      <img src={imageUrl} alt='' />
      <div>
        <h2>{title}</h2>
        <div>
          <div>
            <h3>{h31}</h3>
            <p>{p1}</p>
          </div>
          <div>
            <h3>{h32}</h3>
            <p>{p2}</p>
          </div>
          <div>
            <h3>{h33}</h3>
            <p>{p3}</p>
          </div>
          <div>
            <h3>{h34}</h3>
            <p>{p4}</p>
          </div>
        </div>
      </div>

    </div>
  )
})
