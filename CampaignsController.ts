import { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import { DateTime } from 'luxon'
import logger from '../../../config/logger'
import Campaign from 'App/Models/Campaign'

export default class CampaignController {
  public async campaign ({
    params,
    response,
  }: HttpContextContract) {
    try{
      logger.info('Invocación de servicio de obtención de datos del campaign. ID : ' + params.campaign_id)

      const campaign = await Campaign.findByOrFail('id', params.campaign_id)

      response.status(200)
      response.send({
        'campaign': {
          'id': campaign?.id,
          'name': campaign?.name,
          'url_link': campaign?.url_link,
          'url_img': campaign?.url_img,
          'target_file': campaign?.target_file,
          'state': campaign?.state,
          'order': campaign?.order,
        },
      })
    } catch(exception){
      logger.error(exception)

      response.status(500)
      response.send({
        'error': {
          'status': 500,
          'message': 'Error interno.',
        },
      })
    }
  }

  public async insertCampaign ({
    request,
    response,
  }: HttpContextContract) {
    try {
      // eslint-disable-next-line max-len
      logger.info('Invocación de servicio de obtención inserción de datos en tabla campaign. ID : ' + request.body().campaign.id)

      const newCampaign = new Campaign()

      newCampaign.id = request.body().campaign.id
      newCampaign.name = request.body().campaign.name
      newCampaign.url_link = request.body().campaign.url_link
      newCampaign.url_img = request.body().campaign.url_img
      newCampaign.target_file = request.body().campaign.target_file
      newCampaign.state = request.body().campaign.state
      newCampaign.order = request.body().campaign.order
      newCampaign.created_date = DateTime.now()
      newCampaign.updated_date = DateTime.now()

      await newCampaign.save()

      response.status(200)
      response.send({
        'response': {
          'ID' : newCampaign.id,
        },
      })
    } catch (exception) {
      logger.error(exception)

      response.status(500)
      response.send({
        'error': {
          'status': 500,
          'message': 'Error interno.',
        },
      })
    }
  }

  public async updateCampaign ({
    request,
    response,
  }: HttpContextContract) {
    try {
      logger.info('Invocación de servicio para la actualización. ID : ' + request.body().campaign.id)

      const campaign = await Campaign.findByOrFail('id', request.body().campaign.id)
      campaign.name = request.body().campaign.name
      campaign.url_link = request.body().campaign.url_link
      campaign.url_img = request.body().campaign.url_img
      campaign.target_file = request.body().campaign.target_file
      campaign.state = request.body().campaign.state
      campaign.order = request.body().campaign.order
      campaign.updated_date = DateTime.now()

      await campaign?.save()

      response.status(200)
      response.send({
        'response': {
          'ID' : request.body().campaign.id,
          'message': 'Se ha actualizado información del campaign',
        },
      })
    } catch (exception) {
      logger.error(exception)
      response.status(500)
      response.send({
        'error': {
          'status': 500,
          'message': 'Error interno.',
        },
      })
    }
  }

  public async updateCampaign ({
    request,
    response,
  }: HttpContextContract) {
    try {
      logger.info('Invocación de servicio para la actualización. ID : ' + request.body().campaign.id)

      const campaign = await Campaign.findByOrFail('id', request.body().campaign.id)
      campaign.name = request.body().campaign.name
      campaign.url_link = request.body().campaign.url_link
      campaign.url_img = request.body().campaign.url_img
      campaign.target_file = request.body().campaign.target_file
      campaign.state = request.body().campaign.state
      campaign.order = request.body().campaign.order
      campaign.updated_date = DateTime.now()

      await campaign?.save()

      response.status(200)
      response.send({
        'response': {
          'ID' : request.body().campaign.id,
          'message': 'Se ha actualizado información del campaign',
        },
      })
    } catch (exception) {
      logger.error(exception)
      response.status(500)
      response.send({
        'error': {
          'status': 500,
          'message': 'Error interno.',
        },
      })
    }
  }

  public async deleteCampaign ({
    request,
    response,
  }: HttpContextContract) {
    try {
      // eslint-disable-next-line max-len
      logger.info('Invocación de servicio para borrar campaign. ID: ' + request.body().campaign.id)

      const campaign = await Campaign.findByOrFail('id', request.body().campaign.id)
      await campaign.delete()
    } catch (e) {
      logger.error(e)
      response.status(500)
      response.send({
        'error': {
          'status': 500,
          'message': 'Error interno.',
        },
      })
    }
  }
}
