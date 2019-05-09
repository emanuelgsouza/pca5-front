<<template>
  <QCard>
    <QCardSection>
      <div class="text-h6 relative-position">
        {{serviceName}}
          <QIcon size="lem" :name="productIcon" right class="absolute-light"/>
      </div>
    </QCardSection>
  <QSeparator/>

  <QCardSection>
    <div> {{ serviceDescription }} <div>
  <QCardSection>

</QCard>
</template>

<script>
import {QCard, QCardSection, QSeparator} from 'quasar'
import {get} from 'lodash'

export default {
  name: 'DashboardCard',
  components: {
    QCard,
    QCardSection,
    QSeparator
  },
  props: {
    service: {
      type: Object
    }
  },
  computed: {
    serviceName () {
      return get(this.service, 'name', '')
    },
    serviceDescription () {
      return get(this.service, 'description', '')
    },
    serviceIcon () {
      if (this.serviceIsOnLine) {
        return 'fas fa-link'
      }

      return 'fas fa-store-alt'
    }
  }
}
</script>
