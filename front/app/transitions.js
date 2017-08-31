export default function() {
  this.transition(
    this.use('fade', { duration: 150  }),
    this.debug()
  );
}   
