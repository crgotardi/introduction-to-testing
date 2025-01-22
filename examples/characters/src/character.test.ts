import { describe, it, expect } from 'vitest';
import { Character } from './character.js';
import { Person } from './person.js';

const firstName = 'John'
const lastName = 'Doe'
const role = 'Computer Scientist'

describe('Character', () => {
  it('should create a character with a first name, last name, and role',  () => {
    const character = new Character(firstName, lastName, role)

    expect(character.firstName).toBe(firstName)
    expect(character.lastName).toBe(lastName)
    expect(character.role).toBe(role)

    expect(character).toEqual(expect.objectContaining({
      firstName,
      lastName,
      role,
    }))

    expect(character).toEqual({
      firstName,
      lastName,
      role,
      strength: expect.any(Number),
      wisdom: expect.any(Number),
      dexterity: expect.any(Number),
      intelligence: expect.any(Number),
      constitution: expect.any(Number),
      charisma: expect.any(Number),
      level: expect.any(Number),
      lastModified: expect.any(Date),
      createdAt: expect.any(Date),
      id: expect.stringContaining('person-')
    })
  });

  it('should allow you to increase the level', () => {
    const character = new Character(firstName, lastName, role)
    const initialLevel = character.level

    character.levelUp()
    expect(character.level).toBeGreaterThan(initialLevel)
  });

  it('should update the last modified date when leveling up', () => {
    const character = new Character(firstName, lastName, role)
    const initialLastModified = character.lastModified

    character.levelUp()

    expect(character.lastModified).not.toBe(initialLastModified)
  });
});
