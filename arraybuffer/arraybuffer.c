#include <assert.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>

typedef struct {
  uint8_t tail, head;
  uint16_t size;
  uint8_t* buffer;
} RingBuffer;

RingBuffer createRing (uint16_t size) {
  uint8_t* buffer = calloc(size, 1);
  return (RingBuffer) { .size = size, .tail = 0, .head = size - 1, .buffer = buffer };
}

uint16_t get_size (RingBuffer* buffer) {
  if (buffer->tail > buffer->head) {
    return buffer->tail - buffer->head - 1;
  }
  return buffer->size - 1 - buffer->head + buffer->tail;
}

void add (RingBuffer* buffer, uint8_t item) {
  uint8_t new_tail = (buffer->tail + 1) % buffer->size;
  if (buffer->head == new_tail) {
    // TODO: reallocate
    fprintf(stderr, "Error: cannot add value %d. tail %d will reach head %d. Size is %d\n", item, buffer->tail, buffer->head, get_size(buffer));
    exit(1);
  }
  buffer->buffer[buffer->tail % buffer->size] = item;
  buffer->tail = new_tail;
}

int pop (RingBuffer* buffer) {
  uint8_t new_head = (buffer->head + 1) % buffer->size;
  if (new_head == buffer->tail) {
    // nothing to remove
    return -1;
  }

  uint8_t value = buffer->buffer[buffer->head];
  buffer->head = new_head;

  return value;
}

uint8_t get (RingBuffer* buffer, uint8_t idx) {
  uint16_t size = get_size(buffer);
  if (idx > size - 1) {
    fprintf(stderr, "Error: Index %d is greated than size %d\n", idx, size);
    exit(1);
  }
  return buffer->buffer[(buffer->head + 1 + idx) % buffer->size];
}

int main () {
  RingBuffer mybuffer = createRing(5);
  add(&mybuffer, 1);
  add(&mybuffer, 2);
  add(&mybuffer, 3);
  assert(get_size(&mybuffer) == 3);

  printf("%d\n", get(&mybuffer, 0));
  printf("%d\n", get(&mybuffer, 1));
  printf("%d\n", get(&mybuffer, 2));


  pop(&mybuffer);
  pop(&mybuffer);
  pop(&mybuffer);

  assert(get_size(&mybuffer) == 0);

  add(&mybuffer, 5);
  add(&mybuffer, 6);
  add(&mybuffer, 7);
  assert(get_size(&mybuffer) == 3);

  printf("%d\n", get(&mybuffer, 0));
  printf("%d\n", get(&mybuffer, 1));
  printf("%d\n", get(&mybuffer, 2));

  printf("tail: %d, head: %d, size: %d\n", mybuffer.tail, mybuffer.head, get_size(&mybuffer));
  free(mybuffer.buffer);
}
