import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import PreviewImage from './PreviewImage';

export default function PreviewAndCrop({ appwrite, imageId }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(0);
  const [background, setBackground] = useState(null);
  const [output, setOutput] = useState(null);

  return (
    <div>
      <h1>Preview and Crop Image</h1>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          {'width : '}
          <Input
            style={{ marginRight: 10 }}
            value={width}
            margin="dense"
            onChange={(e) => setWidth(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => {
              if (width < 0) {
                setWidth(0);
              } else if (width > 4000) {
                setWidth(4000);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 4000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {'possible values 0 - 4000 '}
        </Grid>
        <Grid item>
          {'height : '}
          <Input
            style={{ marginRight: 10 }}
            value={height}
            margin="dense"
            onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => {
              if (height < 0) {
                setHeight(0);
              } else if (height > 4000) {
                setHeight(4000);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 4000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {'possible values 0 - 4000 '}
        </Grid>
        <Grid item>
          {'quality : '}
          <Input
            style={{ marginRight: 10 }}
            value={quality}
            margin="dense"
            onChange={(e) => setQuality(e.target.value === '' ? '' : Number(e.target.value))}
            onBlur={() => {
              if (quality < 0) {
                setQuality(0);
              } else if (quality > 100) {
                setQuality(100);
              }
            }}
            inputProps={{
              step: 1,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          {'possible values 0 - 100 '}
        </Grid>
        <Grid item>
          {'background : '}
          <input
            style={{ marginRight: 10 }}
            type="color"
            onChange={(e) => setBackground(e.target.value.replace('#', ''))}
          />
          only works for png with transparent background
        </Grid>
        <Grid item>
          {'output : '}
          <select onChange={(e) => setOutput(e.target.value)}>
            <option value="jpeg">jpeg</option>
            <option value="jpg">jpg</option>
            <option value="png">png</option>
            <option value="gif">gif</option>
            <option value="webp">webp</option>
          </select>
        </Grid>
      </Grid>
      <Grid item style={{ marginTop: 15 }}>
        <PreviewImage
          appwrite={appwrite}
          width={width}
          height={height}
          quality={quality}
          background={background}
          output={output}
          id={imageId}
        />
      </Grid>
    </div>
  );
}
