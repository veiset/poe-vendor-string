// https://stackoverflow.com/questions/3080421/javascript-color-gradient
export function getGradientColor(start_color: string, end_color: string, percent: number): string {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(start_color.length === 3){
        start_color = start_color.replace(/(.)/g, '$1$1');
    }

    if(end_color.length === 3){
        end_color = end_color.replace(/(.)/g, '$1$1');
    }

    // get colors
    let start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);

    let end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);

    // calculate new color
    let diff_red = end_red - start_red;
    let diff_green = end_green - start_green;
    let diff_blue = end_blue - start_blue;

    let ndiff_red = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
    let ndiff_green = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
    let ndiff_blue = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];

    // ensure 2 digits by color
    if( ndiff_red.length === 1 ) ndiff_red = '0' + diff_red
    if( ndiff_green.length === 1 ) ndiff_green = '0' + diff_green
    if( ndiff_blue.length === 1 ) ndiff_blue = '0' + diff_blue

    return '#' + ndiff_red + ndiff_green + ndiff_blue;
}