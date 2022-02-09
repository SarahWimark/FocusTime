import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMillisec = (minutes) => minutes * 1000 * 60;

const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = useRef(null);
  const countdown = () => {
    setMilliSecs((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        return time;
      }
      const timeleft = time - 1000;
      return timeleft;
    });
  };

  useEffect(() => {
    setMilliSecs(minutesToMillisec(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(milliSecs / minutesToMillisec(minutes));
    if (milliSecs === 0) {
      onEnd();
    }
  }, [milliSecs]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countdown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [milliSecs, setMilliSecs] = useState(null);

  const minutesLeft = Math.floor(milliSecs / 1000 / 60) % 60;
  const secsLeft = Math.floor(milliSecs / 1000) % 60;

  return (
    <View>
      <Text style={styles.text}>
        {formatTime(minutesLeft)} : {formatTime(secsLeft)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: '#fff',
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
