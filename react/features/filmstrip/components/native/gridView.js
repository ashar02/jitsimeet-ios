import React, { Component } from "react";
import { View, Text, Dimensions, FlatList, SafeAreaView } from "react-native";
import { connect } from "../../../base/redux";
import Thumbnail from "./Thumbnail";

class GridView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullWidth: Dimensions.get("window").width,
            fullHeight: Dimensions.get("window").height - 50 ,
            tileSize: 0,
        };
    }
    componentDidMount = () => {
        const tileSize =
            this.state.fullHeight /
            (this.props?._participants?.length / 2).toFixed(0);
        this.setState({ tileSize: tileSize });
    };
    renderTwoItem=({ item, index })=>{
        return(
         <View key={index}>
                <Thumbnail
                    disableTint={true}
                    key={item.id}
                    participant={item}
                    renderDisplayName={true}
                    styleOverrides={{
                        aspectRatio: null,
                        flex: 1,
                        height: this.state.fullHeight / 2,
                        maxHeight: this.state.fullHeight / 2,
                        maxWidth: (this.state.fullWidth) - 15,
                        width: (this.state.fullWidth) - 15,
                        borderRadius:10
                    }}
                    tileView={true}
                />
            </View>
        )
    }
    renderItem = ({ item, index }) => {
        const tileSize =
            this.state.fullHeight /
            (this.props?._participants?.length / 2).toFixed(0);
        const styleOverrides = {
            aspectRatio: 2,
            flex: 1,
            height: tileSize,
            maxHeight: tileSize,
            maxWidth: (this.state.fullWidth / 2) - 15,
            width: (this.state.fullWidth / 2) - 15,
            borderRadius:10
        };
        

        if (
            this.props?._participants?.length % 2 !== 0
                ? index !== this.props?._participants?.length - 1
                : true
        ) {
            return (
                <View>
                    <Thumbnail
                        disableTint={true}
                        key={item.id}
                        participant={item}
                        renderDisplayName={true}
                        styleOverrides={styleOverrides}
                        tileView={true}
                    />
                </View>
            );
        }
    };

    render() {

        const tileSize =
            this.state.fullHeight /
            (this.props?._participants?.length / 2).toFixed(0);
            const styleOverrides = {
                aspectRatio: null,
                flex: 1,
                height: tileSize - 14,
                maxHeight: tileSize - 14,
                maxWidth: this.state.fullWidth,
                width: this.state.fullWidth - 24,
                alignSelf:'center',
                borderRadius: 10
            };
            const localParticipantStyleOverrides = {
                aspectRatio: null,
                flex: 1,
                height: 150,
                maxHeight: 150,
                maxWidth: 150,
                width: 200,
                borderRadius:10,
               
            }
        return (
            <SafeAreaView>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        width: this.state.fullWidth,
                        height: this.state.fullHeight,
                        alignSelf:'center',
                        alignItems:'center'
                    }}>
                        {
                            this.props?._participants.length > 2 && (
                                <FlatList
                                    data={this.props._participants}
                                    renderItem={this.renderItem}
                                    numColumns={2}
                                    key={1}
                                    scrollEnabled={false}
                                />
                            )
                        }
                         {
                              this.props?._participants.length == 2 && (
                                <FlatList
                                data={this.props._participants}
                                renderItem={this.renderTwoItem}
                                numColumns={1}
                                key={2}
                                scrollEnabled={false}
                            />
                              )
                           }
                    {this.props?._participants?.length % 2 !== 0 ? (
                    <View
                        style={{
                          
                            alignSelf:'center',
                            marginBottom:3
                        }}
                    >
                        <Thumbnail
                            disableTint={true}
                            key={this.props._participants[this.props?._participants?.length - 1].id}
                            participant={this.props._participants[this.props?._participants?.length - 1]}
                            renderDisplayName={true}
                            styleOverrides={styleOverrides}
                            tileView={true}
                        />
                    </View>
                ) : (
                    <View></View>
                )}
                <View style={{position:'absolute', right:12, bottom:6}}>
                <Thumbnail
                            disableTint={true}
                            key={this.props._localParticiapnt[0].id}
                            participant={this.props._localParticiapnt[0]}
                            renderDisplayName={true}
                            styleOverrides={localParticipantStyleOverrides}
                            tileView={true}
                        />
                </View>
                </View>
                
            </View>
            </SafeAreaView>
        );
    }
}

function _mapStateToProps(state) {
    const responsiveUi = state["features/base/responsive-ui"];
    const participants = state["features/base/participants"];
    const localParticiapnt = participants.filter(p => p.local == true);

    return {
        _aspectRatio: responsiveUi.aspectRatio,
        _height: responsiveUi.clientHeight,
        _participants: participants.filter(p => p.local == false),
        _width: responsiveUi.clientWidth,
        _localParticiapnt: localParticiapnt
    };
}

export default connect(_mapStateToProps)(GridView);
