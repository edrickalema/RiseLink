import { Schema, SessionIdSymbol, State } from "@livestore/livestore";

export const tables = {
  // User table to store user information
  // Each user has a unique ID and can have preferences stored as JSON
  user: State.SQLite.table({
    name: "users",
    columns: {
      id: State.SQLite.text({
        primaryKey: true,
      }),
      username: State.SQLite.text(),
      preferences: State.SQLite.json(),
    },
  }),

  //   Chains table to store user chains
  // Each chain has a unique ID, a user ID, and can have a name and description
  // Chains are used to group habits together
  chains: State.SQLite.table({
    name: "chains",
    columns: {
      id: State.SQLite.text({
        primaryKey: true,
      }),
      userId: State.SQLite.text(),
      name: State.SQLite.text(),
      description: State.SQLite.text(),

      createdAt: State.SQLite.integer({
        default: Date.now(),
      }),
    },
  }),

  //   Habits table to store user habits
  // Each habit is associated with a chain

  habits: State.SQLite.table({
    name: "habits",
    columns: {
      id: State.SQLite.text({
        primaryKey: true,
      }),
      chainId: State.SQLite.text(),
      name: State.SQLite.text(),
      durationMinutes: State.SQLite.integer(),
      order: State.SQLite.integer(),
      createdAt: State.SQLite.integer({
        default: Date.now(),
      }),
    },
  }),

  //   Completions table to store habit completions
  completions: State.SQLite.table({
    name: "completions",
    columns: {
      id: State.SQLite.text({ primaryKey: true }),
      chainId: State.SQLite.text(),
      habitId: State.SQLite.text(),
      createdAt: State.SQLite.integer({
        default: Date.now(),
      }),
    },
  }),

  //

  uiState: State.SQLite.clientDocument({
    name: "uiState",
    schema: Schema.Struct({
      chainName: Schema.String,
      chainDescription: Schema.String,
      habits: Schema.Array(
        Schema.Struct({
          id: Schema.String,
          name: Schema.String,
          durationMinutes: Schema.Number,
          order: Schema.Number,
        })
      ),
      preferences: Schema.Struct({
        reminderTime: Schema.String,
      }),
    }),
    default: {
      id: SessionIdSymbol,
      value: {
        chainName: "",
        chainDescription: "",
        habits: [],
        preferences: {
          reminderTime: "08:00",
        },
      },
    },
  }),
};
