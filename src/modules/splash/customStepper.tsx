import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Tooltip from 'rn-tooltip';
import common from '../../constants/constants';

const Stepper = props => {
  const [stepsCount, setStepsCount] = useState(props.numberOfSteps);
  const [lastActivated, setLastActivated] = useState(props.lastActivated);
  const [lastFailed, setLastFailed] = useState(props.lastFailed || null);

  const elements = [];
  const stepDetailsList = props.stepDetailsList;
  const lightBg = props.hoverBackground;
  const hoverTextColor = props.hoverTextColor;
  const widthString = (100 / stepsCount).toString() + '%';
  for (var i = 0; i < stepsCount; i++) {
    if (i != stepsCount - 1) {
      if (lastActivated && i + 1 < lastActivated) {
        elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row', width: widthString}}
            key={i}>
            <View style={[styles(props).step, styles(props).activated]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>

            <View style={[styles(props).next, styles(props).activated]}></View>
          </View>,
        );
      } else if (lastActivated && i + 1 == lastActivated) {
        if (lastFailed && lastFailed > lastActivated) {
          elements.push(
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: widthString,
              }}
              key={i}>
              <View style={[styles(props).step, styles(props).activated]}>
                <Tooltip
                  withOverlay={false}
                  backgroundColor={lightBg}
                  popover={
                    <Text style={{color: hoverTextColor}}>
                      {stepDetailsList[i].stepName}
                    </Text>
                  }>
                  <Image
                    resizeMode="center"
                    style={styles(props).iconImgActivated}
                    source={stepDetailsList[i].iconImg}
                  />
                </Tooltip>
              </View>
              <View style={[styles(props).next, styles(props).failed]}></View>
            </View>,
          );
        } else {
          elements.push(
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: widthString,
              }}
              key={i}>
              <View style={[styles(props).step, styles(props).activated]}>
                <Tooltip
                  withOverlay={false}
                  backgroundColor={lightBg}
                  popover={
                    <Text style={{color: hoverTextColor}}>
                      {stepDetailsList[i].stepName}
                    </Text>
                  }>
                  <Image
                    resizeMode="center"
                    style={styles(props).iconImgActivated}
                    source={stepDetailsList[i].iconImg}
                  />
                </Tooltip>
              </View>
              <View style={[styles(props).next]}></View>
            </View>,
          );
        }
      } else if (lastFailed && i + 1 < lastFailed) {
        elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row', width: widthString}}
            key={i}>
            <View style={[styles(props).step, styles(props).failed]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>

            <View style={[styles(props).next, styles(props).failed]}></View>
          </View>,
        );
      } else if (lastFailed && i + 1 == lastFailed) {
        elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row', width: widthString}}
            key={i}>
            <View style={[styles(props).step, styles(props).failed]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
            <View style={[styles(props).next]}></View>
          </View>,
        );
      } else if (
        lastActivated &&
        lastFailed &&
        i + 1 > lastActivated &&
        i + 1 == lastFailed
      ) {
        elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row', width: widthString}}
            key={i}>
            <View style={[styles(props).step, styles(props).failed]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
            <View style={[styles(props).next, styles(props)]}></View>
          </View>,
        );
      } else if (
        lastActivated &&
        lastFailed &&
        i + 1 > lastActivated &&
        i + 1 < lastFailed
      ) {
        elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row', width: widthString}}
            key={i}>
            <View style={[styles(props).step, styles(props).failed]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
            <View style={[styles(props).next, styles(props).failed]}></View>
          </View>,
        );
      } else {
        elements.push(
          <View
            style={{display: 'flex', flexDirection: 'row', width: widthString}}
            key={i}>
            <View style={[styles(props).step]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImg}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
            <View style={[styles(props).next]}></View>
          </View>,
        );
      }
    } else {
      if (lastActivated && i + 1 == lastActivated) {
        elements.push(
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderColor: 'green',
              borderWidth: 0,
              width: widthString,
            }}
            key={i}>
            <View style={[styles(props).step, styles(props).activated]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
          </View>,
        );
      } else if (lastFailed && i + 1 == lastFailed) {
        elements.push(
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderColor: 'green',
              borderWidth: 0,
              width: widthString,
            }}
            key={i}>
            <View style={[styles(props).step, styles(props).failed]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImgActivated}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
          </View>,
        );
      } else {
        elements.push(
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              borderColor: 'green',
              borderWidth: 0,
              width: widthString,
            }}
            key={i}>
            <View style={[styles(props).step]}>
              <Tooltip
                withOverlay={false}
                backgroundColor={lightBg}
                popover={
                  <Text style={{color: hoverTextColor}}>
                    {stepDetailsList[i].stepName}
                  </Text>
                }>
                <Image
                  resizeMode="center"
                  style={styles(props).iconImg}
                  source={stepDetailsList[i].iconImg}
                />
              </Tooltip>
            </View>
          </View>,
        );
      }
    }
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}>
      {elements}
    </View>
  );
};

const styles = props =>
  StyleSheet.create({
    step: {
      aspectRatio: 1,
      width: '65%',
      borderRadius: 1000,
      borderColor: 'gray',
      borderWidth: 2,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    next: {
      width: '35%',
      height: 1,
      borderColor: 'gray',
      borderWidth: 1,
      alignSelf: 'center',
    },
    iconImgActivated: {
      height: '100%',
      aspectRatio: 1,
      tintColor: 'white',
    },
    iconImg: {
      height: '100%',
      aspectRatio: 1,
      tintColor: 'black',
    },
    activated: {
      borderColor: props.successColor,
      backgroundColor: props.successColor,
      borderWidth: 1.5,
    },
    failed: {
      borderColor: props.failedColor,
      backgroundColor: props.failedColor,
      borderWidth: 1.5,
    },
  });

export default Stepper;
// <ScrollView style={styles.container}>
//   <View style={styles.container}>
//     <View style={styles.header}>
//       <Text style={styles.headerText}>Edit Item</Text>
//     </View>

//     {imageData !== null ? (
//       <TouchableOpacity
//         onPress={() => {
//           requestCameraPermission();
//         }}>
//         <Image
//           source={{uri: imageData.assets[0].uri}}
//           style={styles.imageStyle}
//         />
//       </TouchableOpacity>
//     ) : (
//       <TouchableOpacity
//         style={styles.pickBtn}
//         onPress={() => {
//           requestCameraPermission();
//         }}>
//         <Text>{'Add Image From Gallery'}y</Text>
//       </TouchableOpacity>
//     )}
//     <TextInput
//       placeholder="Enter Item Name"
//       style={styles.inputStyle}
//       value={name}
//       onChangeText={text => setName(text)}
//     />
//     <TextInput
//       placeholder="Enter Item Price"
//       style={styles.inputStyle}
//       value={price}
//       onChangeText={text => setPrice(text)}
//     />
//     <TextInput
//       placeholder="Enter Item Discount Price"
//       style={styles.inputStyle}
//       value={discountPrice}
//       onChangeText={text => setDiscountPrice(text)}
//     />
//     <TextInput
//       placeholder="Enter Item Description"
//       style={styles.inputStyle}
//       value={description}
//       onChangeText={text => setDescription(text)}
//     />
//     <TextInput
//       placeholder="Enter Item Image URL"
//       style={styles.inputStyle}
//       value={imageUrl}
//       onChangeText={text => setImageUrl(text)}
//     />
//     {/* <Text style={{alignSelf: 'center', marginTop: 20}}>OR</Text>
//     <TouchableOpacity
//       style={styles.pickBtn}
//       onPress={() => {
//         requestCameraPermission();
//       }}>
//       <Text>Pick Image From Gallery</Text>
//     </TouchableOpacity> */}
//     <TouchableOpacity
//       style={styles.uploadBtn}
//       onPress={() => {
//         uploadItem();
//       }}>
//       <Text style={{color: '#Fff'}}>Upload Item</Text>
//     </TouchableOpacity>
//   </View>
// </ScrollView>
