import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cards = () => {
  return (
          <View style={styles.cardContainer}>
            <View style={styles.cardRow}>
              <View style={styles.card}>
                <Image source={require('../assets/icons/mc.png')} style={styles.image}/>
                  <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>Top 10 coins profit</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.coin}/>
                  <Text style={styles.cardValue}>156.92K</Text>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Lvl 1</Text>
                  <View style={styles.levelRow}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin}/>
                  <Text style={styles.levelValue}>900K</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
                <Image source={require('../assets/icons/meme.png')} style={styles.image}/>
                  <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>Top 10 coins profit</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.coin}/>
                  <Text style={styles.cardValue}>156.92K</Text>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Lvl 1</Text>
                  <View style={styles.levelRow}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin}/>
                  <Text style={styles.levelValue}>900K</Text>
                  </View>
                </View>
              </View>
            </View>
            </View>
            <View style={styles.cardRow}>
            <View style={styles.card}>
                <Image source={require('../assets/icons/x10.png')} style={styles.image}/>
                  <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>Top 10 coins profit</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.coin}/>
                  <Text style={styles.cardValue}>156.92K</Text>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Lvl 1</Text>
                  <View style={styles.levelRow}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin}/>
                  <Text style={styles.levelValue}>900K</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
                <Image source={require('../assets/icons/x20.png')} style={styles.image}/>
                  <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>Top 10 coins profit</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.coin}/>
                  <Text style={styles.cardValue}>156.92K</Text>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Lvl 1</Text>
                  <View style={styles.levelRow}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin}/>
                  <Text style={styles.levelValue}>900K</Text>
                  </View>
                </View>
              </View>
            </View>
            </View>
            <View style={styles.cardRow}>
            <View style={styles.card}>
                <Image source={require('../assets/icons/x30.png')} style={styles.image}/>
                  <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>Top 10 coins profit</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.coin}/>
                  <Text style={styles.cardValue}>156.92K</Text>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Lvl 1</Text>
                  <View style={styles.levelRow}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin}/>
                  <Text style={styles.levelValue}>900K</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.card}>
                <Image source={require('../assets/icons/x50.png')} style={styles.image}/>
                  <View style={styles.cardDetails}>
                  <Text style={styles.cardLabel}>Top 10 coins profit</Text>
                  <Text style={styles.profitText}>Profit per hour</Text>
                  <View style={styles.profitContainer}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.coin}/>
                  <Text style={styles.cardValue}>156.92K</Text>
                </View>
                <View style={styles.levelContainer}>
                  <Text style={styles.levelText}>Lvl 1</Text>
                  <View style={styles.levelRow}>
                  <Image source={require('../assets/icons/coins.png')} style={styles.levelCoin}/>
                  <Text style={styles.levelValue}>900K</Text>
                  </View>
                </View>
              </View>
            </View>
            </View>
          </View>
  )
}

export default Cards

const styles = StyleSheet.create({})