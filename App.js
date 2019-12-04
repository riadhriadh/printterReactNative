import React, {Component} from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View,
} from 'react-native';

import RNPrint from 'react-native-print';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
export default class RNPrintExample extends Component {
  state = {
    selectedPrinter: null,
  };

  // @NOTE iOS Only
  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter();
    this.setState({selectedPrinter});
  };

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First');
    }

    const jobName = await RNPrint.print({
      printerURL: this.state.selectedPrinter.url,
      html: '<h1>Silent Print</h1>',
    });
  };

  async printHTML() {
    let imp=`<script></script> <script type="text/javascript" src="./JsBarcode.all.min.js"></script><body onload="generateBarcode()"><div id="container" style="margin:30px,0,0,0;" ><svg id="upcCode"></svg></div></body>`;
    let res = await RNPrint.print({
      html:imp,
    });
    // const results = await RNHTMLtoPDF.convert({
    //   html: imp,
    //   fileName: 'test',
    //   base64: true,
    // })

    // await RNPrint.print({ filePath: results.filePath })
    // alert(res);
  }

  async printRemotePDF() {
    await RNPrint.print({
      filePath: 'https://graduateland.com/api/v2/users/jesper/cv',
    });
  }

  customOptions = () => {
    return (
      <View>
        {/* {this.state.selectedPrinter && (
          <View>
            <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
          </View>
        )} */}
        <Button onPress={this.selectPrinter} title="Select Printer" />
        <Button onPress={this.silentPrint} title="Silent Print" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && this.customOptions()}
        <Button onPress={this.printHTML} title="Print HTML" />
        {/* <Button onPress={this.printPDF} title="Print PDF" /> */}
        <Button onPress={this.printRemotePDF} title="Print Remote PDF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
