<template>
  <v-row align-content='center' justify='center'>
    <v-col cols="6" v-if='hardwareWallets.length !== 1'>
      <v-row align-content='center' justify='center'>
        <v-col cols= '12'>
          <v-alert v-if='hardwareWallets.length === 0 && !lookingforWallet'
            dense
            border="left"
            type="warning"
          >
            No Wallet Not Found
          </v-alert>
          <v-alert v-if='hardwareWallets.length > 1'
            dense
            border="left"
            type="warning"
          >
            Too Many Wallets Connected
          </v-alert>
        </v-col>
        <v-col v-if='hardwareWallets.length !== 1 && !lookingforWallet'
            cols='12'>
          <v-row
            align="center"
            justify="space-around"
          >
            <v-btn class='mx-auto'
            @click='getDevices'
            color='primary'>
              Look for Wallet
            </v-btn>
          </v-row>
        </v-col>
        <v-col v-if='lookingforWallet' cols='12'>
          <v-row
            align="center"
            justify="space-around"
            class="mb-5"
          >
            <v-progress-circular
               indeterminate
               color="primary"
               :size="100"
             ></v-progress-circular>
          </v-row>
          <v-row
            align="center"
            justify="space-around"
            class="mt-5"
          >
          <v-alert
              color="black"
              dark
              type="info"
              border="left"
            >
            Looking for Wallet...
            </v-alert>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col justify="center" v-if='hardwareWallets.length === 1' cols='12'>
      <component
      v-bind:is="correctComponent(hardwareWallets[0].model)"
      v-bind:walletInfo='hardwareWallets[0]'
      v-bind:goal='goal'
      v-bind:goalInfo='goalInfo'
      v-on:goalCompleted="goalCompleted"
      />
    </v-col>
  </v-row>
</template>

<script>
import {
  listDevices
} from '@/assets/util/hwi/general.js'
import extractXpub from '@/components/hardwareWallets/walletGoals/extractXpub.vue'
import getVersion from '@/components/hardwareWallets/walletGoals/getVersion.vue'
import getInfo from '@/components/hardwareWallets/walletGoals/getGenWalletInfo.vue'
import showAddress from '@/components/hardwareWallets/walletGoals/showAddress.vue'
import signTrans from '@/components/hardwareWallets/walletGoals/signTrans.vue'
import getStatus from '@/components/hardwareWallets/walletGoals/getStatus.vue'
import checkMasterFingerprint from '@/components/hardwareWallets/walletGoals/checkMasterFingerprint.vue'
import manageWallet from '@/components/hardwareWallets/walletGoals/manageWallet.vue'
import installFirmware from '@/components/hardwareWallets/walletGoals/installFirmware.vue'
import initialize from '@/components/hardwareWallets/walletGoals/initialize.vue'
import backup from '@/components/hardwareWallets/walletGoals/backup.vue'
import backupFailed from '@/components/hardwareWallets/walletGoals/backupFailed.vue'
import wipeSetupInfo from '@/components/hardwareWallets/walletGoals/wipeSetupInfo.vue'
import checkIfUpdateNeeded from '@/components/hardwareWallets/walletGoals/checkIfUpdateNeeded.vue'
import restore from '@/components/hardwareWallets/walletGoals/restore.vue'
export default {
  components: {
    extractXpub,
    getVersion,
    getInfo,
    showAddress,
    signTrans,
    getStatus,
    checkMasterFingerprint,
    installFirmware,
    initialize,
    backup,
    backupFailed,
    wipeSetupInfo,
    restore
  },
  name: 'mainWalletTool',
  props: ['goal', 'goalInfo', 'hardwareInfo'],
  data: () => ({
    hardwareWallets: [],
    lookingforWallet: false
  }),
  methods: {
    getDevices: async function () {
      this.lookingforWallet = true
      const result = await listDevices()
      this.lookingforWallet = false
      this.hardwareWallets = result
    },
    correctComponent: function () {
      switch (this.goal) {
      case 'extractXpub':
        return extractXpub
      case 'getVersion':
        return getVersion
      case 'getInfo':
        return getInfo
      case 'showAddress':
        return showAddress
      case 'signTrans':
        return signTrans
      case 'getStatus':
        return getStatus
      case 'checkFingerPrint':
        return checkMasterFingerprint
      case 'manageWallet':
        return manageWallet
      case 'installFirmware':
        return installFirmware
      case 'initialize':
        return initialize
      case 'backup':
        return backup
      case 'backupFailed':
        return backupFailed
      case 'wipeSetupInfo':
        return wipeSetupInfo
      case 'checkIfUpdateNeeded':
        return checkIfUpdateNeeded
      case 'restore':
        return restore
      default:
        console.log('Unknown Goal', this.goal)
      }
    },
    goalCompleted: function (info) {
      this.$emit('goalCompleted', this.goal, info)
    }
  },
  computed: {
  },
  mounted () {
    if (this.hardwareInfo) {
      this.hardwareWallets = this.hardwareInfo
    }
    this.lookingforWallet = true
    this.getDevices()
  }
}
</script>
