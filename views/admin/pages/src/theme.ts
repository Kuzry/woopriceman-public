import { MantineTheme, MantineThemeOverride } from "@mantine/core";
import "@fontsource/lato/400.css";
import "@fontsource/fira-sans/700.css";

export const fontLato400Styles = {
  fontFamily: '"Lato", sans-serif',
  fontSize: 16,
  fontWeight: 400,
  lineHeight: 1.5,
};

export const theme: MantineThemeOverride = {
  globalStyles: (theme) => ({
    "#wpwrap": {
      background: "#EBF0F5",
    },
    "#woopriceman-admin-pages": {
      ...fontLato400Styles,
    },
    "#wpfooter": {
      display: "none",
    },
    "#wpbody-content": {
      paddingBottom: 0,
    },
  }),
  fontSizes: {
    md: "1rem",
  },
  components: {
    Button: {
      defaultProps: {
        color: "grape",
        variant: "filled",
      },
      styles: (theme: MantineTheme, props: any) => {
        return {
          root: {
            ...fontLato400Styles,
            background: "#456bed",
            borderRadius: 5,
            height: "auto",
            padding: ".5rem .75rem",

            "&:hover": {
              background: "#5e80f5",
            },

            "&:active": {
              transform: "none",
            },

            "&:focus": {
              outlineOffset: 2,
              outline:
                "2px solid " +
                theme.colors[props.color][theme.fn.primaryShade()],
            },
          },
          label: {},
        };
      },
    },
    Container: {
      defaultProps: {
        size: "xl",
      },
    },
    Modal: {
      defaultProps: {
        target: "#woopriceman-admin-pages",
        transitionProps: {
          duration: 200,
          exitDuration: 200,
          transition: "pop",
        },
      },
      styles: () => {
        return {
          overlay: {
            zIndex: 99999,
          },
          close: {},
          header: {
            margin: 0,
          },
          inner: {
            boxSizing: "border-box",
            left: 0,
            padding: "50px 0 50px 160px",
            // paddingRight: 0,
            zIndex: 99999,

            ["@media only screen and (max-width: 960px)"]: {
              paddingLeft: 0,
            },
          },
          modal: {
            borderRadius: 5,
          },
        };
      },
    },
    MultiSelect: {
      styles: () => ({
        searchInput: {
          border: "none !important",

          "&:focus": {
            boxShadow: "none !important",
          },
        },
      }),
    },
    Paper: {
      defaultProps: {
        shadow: "sm",
        withBorder: true,
      },
    },
    SegmentedControl: {
      defaultProps: {
        // transitionDuration: 0,
      },
    },
    Select: {
      styles: () => ({
        root: {
          ...fontLato400Styles,
        },
        label: {
          ...fontLato400Styles,
        },
        input: {
          ...fontLato400Styles,
          background: "#fff !important",
          borderColor: "#ced4da !important",
        },
      }),
    },
    Switch: {
      styles: () => ({
        track: {
          // backgroundColor: "#456bed !important",
          // borderColor: "#456bed !important",
        },
      }),
      defaultProps: {
        color: "#456bed",
      },
    },
    Text: {
      styles: () => ({
        root: {
          ...fontLato400Styles,
        },
      }),
    },
    TextInput: {
      styles: () => ({
        root: {
          ...fontLato400Styles,
        },
        label: {
          ...fontLato400Styles,
        },
        wrapper: {
          margin: 0,
        },
        input: {
          ...fontLato400Styles,
        },
        error: {
          ...fontLato400Styles,
        },
      }),
    },
    UnstyledButton: {
      styles: () => ({
        root: {
          ...fontLato400Styles,
        },
      }),
    },
  },
};
