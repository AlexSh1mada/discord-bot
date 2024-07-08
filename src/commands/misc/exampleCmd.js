const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("test description")
    .setDMPermission(false)
    .addSubcommandGroup((subCmdGroup) =>
      subCmdGroup
        .setName("user")
        .setDescription("Configure a user")
        .addSubcommand((subCommand) =>
          subCommand
            .setName("role")
            .setDescription("Configure a user's role")
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("The user to configure.")
            )
        )
        .addSubcommand((subCommand) =>
          subCommand
            .setName("nickname")
            .setDescription("Configure a user's nickname.")
            .addStringOption((option) =>
              option.setName("nickname").setDescription("The user's nickname.")
            )
            .addUserOption((option) =>
              option.setName("user").setDescription("The user to configure.")
            )
        )
    )
    .addSubcommand((subCommand) =>
      subCommand
        .setName("message")
        .setDescription("Configure a message.")
    )
    .toJSON(),
  userPermissions: [PermissionFlagsBits.ManageMessages],
  botPermission: [PermissionFlagsBits.Connect],

  run: (client, interaction) => {
    return interaction.reply('This is a test command.');
  }
};
