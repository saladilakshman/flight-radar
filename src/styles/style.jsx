import * as Colors from "@mui/material/colors"
export const StyleSheet = {
    mapbutton: {
        bgColor: Colors.indigo['A400'],
        display: 'block',
        margin: 'auto',
        textTransform: 'lowercase',
        '&:first-letter': {
            textTransform: 'uppercase'
        },
    },
    sidebar: {
        height: '100%',
        width: { xs: 280, lg: 320 }, paddingBlockStart: 4
    },
    flightImage: {
        display: 'block',
        margin: 'auto',
        width: 250
    },
    paddings: {
        paddingInlineStart: 1, paddingBlockStart: 5
    },
    font: {
        fontWeight: 400
    },
    text: {
        fontWeight: 400,
        whiteSpace: 'nowrap'
    },
    closebutton: {
        position: 'absolute',
        bottom: 1,
        backgroundColor: Colors.indigo['A400'],
        '&:is(:hover,:focus)': {
            backgroundColor: Colors.indigo['A400'],
        }
    }

}