/**
 * HorizontalPlaceholderList
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';

import styles from './HorizontalPlaceholderList.styles';

export interface Props {
  title?: string;
  overlayText?: string;
  numItems: number;
}

interface State {}

export default class HorizontalPlaceholderList extends React.Component<
  Props,
  State
> {
  render() {
    return (
      <View style={{ flex: 1, height: 220 }}>
        {this.props.title && (
          <View style={{ marginVertical: 10, paddingHorizontal: 10 }}>
            <Text style={[styles.title, { color: 'grey' }]}>
              {this.props.title}
            </Text>
          </View>
        )}
        <View>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={Array(this.props.numItems).fill('')}
            keyExtractor={(_, i) => `${i}`}
            renderItem={() => (
              <View>
                <View
                  style={{
                    width: 125,
                    height: 125,
                    marginHorizontal: 10,
                    backgroundColor: 'lightgrey',
                    borderRadius: 7,
                    opacity: 0.5,
                  }}
                />
                <View
                  style={{
                    width: 125,
                    height: 30,
                    marginTop: 10,
                    marginHorizontal: 10,
                    backgroundColor: 'lightgrey',
                    borderRadius: 7,
                    opacity: 0.5,
                  }}
                />
              </View>
            )}
          />
          <Text
            style={[
              styles.title,
              {
                position: 'absolute',
                bottom: 4,
                right: 12,
                opacity: 0.8,
                color: 'grey',
              },
            ]}
          >
            {this.props.overlayText}
          </Text>
        </View>
      </View>
    );
  }
}
