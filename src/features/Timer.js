import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';


import { ProgressBar, Color } from 'react-native-paper';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Timing } from './Timing';

export const Timer = ({ focusSubject , clearSubject , onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={ onEnd }
        />

        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focussing on :</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progress}
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
      <RoundedButton title='-' size={50} onPress={clearSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'pink'
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'yellow'
  },

  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection:'row'
  },

  clearSubjectWrapper : {
    flexDirection:'row',
    justifyContent:'center'
  },

  buttonWrapper: {
    flex: 0.3,
    padding: spacing.md,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: 'pink',
  },

  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
