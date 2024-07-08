require("colors");

const { testServerId } = require("../../config.json");
const commandComparing = require("../../utils/commandComparing");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    const [localCommands, applicationCommands] = await Promise.all([
      getLocalCommands(),
      getApplicationCommands(client, testServerId),
    ]);

    for (const localCommand of localCommands) {
      const { data, deleted } = localCommand;
      const {
        name: commandName,
        description: commandDescription,
        options: commandOptions,
      } = data;

      const existingCommand = applicationCommands.cache.find(
        (command) => command.name === commandName
      );

      if (deleted) {
        if (existingCommand) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Successfully deleted command ${commandName}`.yellow);
        } else {
          console.log(
            `Application command ${commandName} has been skipped.`.yellow
          );
        }
      } else if (existingCommand) {
        if (commandComparing(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            name: commandName,
            description: commandDescription,
            options: commandOptions,
          });
          console.log(`Successfully edited command ${commandName}`.yellow);
        }
      } else {
        await applicationCommands.create({
          name: commandName,
          description: commandDescription,
          options: commandOptions,
        });
        console.log(`Successfully created command ${commandName}`.green);
      }
    }
  } catch (error) {
    console.log(`[ERROR] Failed to create command.`.red);
    console.log(error);
  }
};
