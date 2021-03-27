import { PLUGIN_NAME } from '../../constants'

const { wp } = window
const { registerBlockType } = wp.blocks
const { __ } = wp.i18n
const { PlainText, MediaUpload, InspectorControls, MediaPlaceholder } = wp.blockEditor
const { Button, BaseControl, ToggleControl } = wp.components

const BLOCK_NAME = `${PLUGIN_NAME}/nos-solutions`

const ComponentInspector = (data, setAttributes) => {
  return (
    <InspectorControls>
      <BaseControl>
        <MediaUpload
          onSelect={(media) => setAttributes({ imageUrl: media.url, imageId: media.id })}
          type='image'
          value={data.imageId}
          className='file'
          render={({ open }) => (
            <Button
              className={!data.imageUrl && 'button button-large'}
              onClick={open}
            >
              {
                data.imageUrl ? (
                  <div className='inspector-controls-flex'>
                    <img className='inspector-controls-flex-img' src={data.imageUrl} alt='' />
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
          checked={data.switchDisplay}
          onChange={(switchDisplay) => { setAttributes({ switchDisplay }) }}
        />
      </BaseControl>
    </InspectorControls>
  )
}

registerBlockType(BLOCK_NAME, {
  title: __('repeater solutions'),
  description: __('Example repeater block!'),
  icon: 'nametag',
  category: 'common',
  attributes: {
    content: {
      type: 'array'
    },
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
    description: {
      type: 'string'
    }
  },

  edit: props => {
    const { attributes: { content = [] }, setAttributes, className } = props
    return (
      <>
        {content.map((value, index) => {
          return (
            <>
              <div className='nos-solutions'>
                <div>
                  {value.imageUrl ? (
                    <img src={value.imageUrl} alt='' />
                  ) : (
                    <MediaPlaceholder
                      onSelect={(media) => {
                        const newContent = [...content]
                        newContent[index].imageUrl = media.url
                        newContent[index].imageId = media.id
                        setAttributes({ imageUrl: media.url, imageId: media.id })
                      }}
                      allowedTypes={['image']}
                      multiple={false}
                      labels={{ title: 'The Image' }}
                    />
                  )}
                </div>
                <PlainText
                  keepplaceholderonfocus
                  placeholder={__('Title')}
                  value={value.title}
                  onChange={(title) => {
                    const newContent = [...content]
                    newContent[index].title = title
                    setAttributes({ content: newContent })
                  }}
                />
                <PlainText
                  keepplaceholderonfocus
                  placeholder={__('Demo')}
                  value={value.description}
                  onChange={(description) => {
                    const newContent = [...content]
                    newContent[index].description = description
                    setAttributes({ content: newContent })
                  }}
                />
                <Button
                  onClick={() => {
                    const newContent = [
                      ...content.slice(0, index),
                      ...content.slice(index + 1)
                    ]
                    setAttributes({ content: newContent })
                  }}
                >{__('Supprimer')}
                </Button>
              </div>
            </>
          )
        })}
        <Button
          onClick={() => {
            const newContent = [...content, {}]
            setAttributes({ content: newContent })
          }}
        >{__('Ajouter')}
        </Button>
        <ComponentInspector data='value' setAttributes={setAttributes} />
      </>
    )
  },

  save: () => null
})
