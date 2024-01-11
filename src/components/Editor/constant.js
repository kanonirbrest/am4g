import { PLATFORM } from 'utils/constants';

export const FONT_OPTIONS_IOS = 'Arial=arial;'
    + 'Helvetica=helvetica;Helvetica Neue;'
  + 'Verdana=verdana;Trebuchet MS;American Typewriter;'
  + 'Apple SD Gothic Neo;Courier New;'
  + 'Courier=courier;Georgia;Times New Roman;Grotesk;Cooper;Salsa;Custom;';
export const FONT_OPTIONS_ANDROID = 'Ubuntu;Manrope;Inter;Open Sans;'
  + 'Montserrat;Roboto;Rubik;Vollkorn;Bellota;Lora;Grotesk;Cooper;Salsa;Custom;';

// eslint-disable-next-line
export const TOOLBAR_BUTTONS = 'bold italic backcolor foreColor fontsizeinput fontfamily removeformat lineHeight| createLink link unlink strikethrough underline| alignleft aligncenter alignright alignjustify | undo redo';
export const BACKGROUND = {
  DARK: '#3E4554',
  LIGHT: 'white',
};
export const ALLOWED_OBJECT_COMMANDS = [
  'mceToggleFormat',
  'mceApplyTextcolor',
  'mceRemoveTextcolor',
  'FontSize',
  'LineHeight',
  'JustifyRight',
  'JustifyLeft',
  'JustifyCenter',
  'undo',
  'redo',
  'mceLink',
  'mceApplyTextcolor',
  'RemoveFormat',
];
export const NON_EDITABLE_CLASS = '.mceNonEditable';
export const DEFAULT_EDITOR_CLASS = 'root-editor-block';
export const getEditorConfig = (platform) => ({
  forced_root_block: 'div',
  branding: false,
  force_br_newlines: true,
  convert_newlines_to_brs: true,
  remove_linebreaks: false,
  remove_redundant_brs: false,
  noneditable_leave_contenteditable: true,
  toolbar: TOOLBAR_BUTTONS,
  newline_behavior: 'linebreak',
  forced_root_block_attrs: {
    class: DEFAULT_EDITOR_CLASS,
  },
  tabindex: 0,
  height: 50,
  width: '100%',
  autoresize_bottom_margin: 0,
  inline: false,
  extended_valid_elements: 'span[id|src|class|role|style|name]',
  plugins: [
    'link', 'autoresize',
  ],
  link_title: false,
  inline_styles: false,
  formats: {
    underline: { inline: 'u', exact: true },
  },
  link_assume_external_targets: true,
  contextmenu: 'product',
  menubar: 'custom',
  menu: {
    custom: {
      title: 'Add product',
      items: 'nesteditem',
    },
  },
  verify_html: false,
  statusbar: false,
  resize: false,
  font_family_formats: platform === PLATFORM.ANDROID
    ? FONT_OPTIONS_ANDROID : FONT_OPTIONS_IOS,
  setup: (ed) => {
    /* to make unfocused editor disabled */
    ed.on('blur', () => {
      ed.editorContainer
        .classList.add('focused');
      // eslint-disable-next-line no-param-reassign
      // ed.settings.toolbar = TOOLBAR_BUTTONS;
    });
    ed.on('focus', () => {
      ed.editorContainer
        .classList.remove('focused');
      // eslint-disable-next-line no-param-reassign
      // ed.settings.toolbar = TOOLBAR_BUTTONS;
    });
    // initialize here to have an ability to re-define it later
    ed.ui.registry.addNestedMenuItem('nesteditem', {
      text: 'Selected products',
      getSubmenuItems() {
        return [];
      },
    });
  },
  // content_css: '@import(\'https://am.platforms.team/static/html/fonts/EduMonumentGrotesk-Regular.otf\')',
  content_css_cors: false,
  content_style: `
      @import url('https://am.platforms.team/static/html/fonts/fonts.css')
  `,
});
